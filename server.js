const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://192.168.1.100:5000',
    'https://global-logic-final.vercel.app',
    'https://globallogic-final.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✓ MongoDB Connected Successfully');
  })
  .catch(err => {
    console.error('✗ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// ==================== DATABASE SCHEMAS ====================

// Hub Room Checklist Schema
const hubRoomSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  readings: [{
    time: String,
    temperature: Number,
    humidity: Number,
    signature: String,
    notes: String
  }],
  checkedBy: String,
  supervisorName: String,
  supervisorSignature: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Server Room Checklist Schema
const serverRoomSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  readings: [{
    time: String,
    temperature: Number,
    humidity: Number,
    airFlow: String,
    cableManagement: String,
    signature: String,
    notes: String
  }],
  checkedBy: String,
  supervisorName: String,
  supervisorSignature: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// UPS Checklist Schema
const upsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  upsUnit: String,
  readings: [{
    time: String,
    inputVoltage: Number,
    inputFrequency: Number,
    batteryVoltage: Number,
    batteryCapacity: Number,
    outputVoltage: Number,
    outputFrequency: Number,
    outputPower: Number,
    temperature: Number,
    alarmStatus: String,
    signature: String,
    notes: String
  }],
  checkedBy: String,
  supervisorName: String,
  supervisorSignature: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Models
const HubRoom = mongoose.model('HubRoom', hubRoomSchema);
const ServerRoom = mongoose.model('ServerRoom', serverRoomSchema);
const UPS = mongoose.model('UPS', upsSchema);

// ==================== API ROUTES ====================

// HUB ROOM ENDPOINTS
app.post('/api/hubroom/save', async (req, res) => {
  try {
    const { date, readings, checkedBy, supervisorName, supervisorSignature } = req.body;

    const hubRoomData = new HubRoom({
      date: new Date(date),
      readings: readings || [],
      checkedBy,
      supervisorName,
      supervisorSignature
    });

    const savedData = await hubRoomData.save();
    res.status(201).json({
      success: true,
      message: 'Hub Room checklist saved successfully',
      data: savedData,
      id: savedData._id
    });
  } catch (error) {
    console.error('Error saving Hub Room data:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving Hub Room checklist',
      error: error.message
    });
  }
});

app.get('/api/hubroom/all', async (req, res) => {
  try {
    const allRecords = await HubRoom.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: allRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Hub Room records',
      error: error.message
    });
  }
});

app.get('/api/hubroom/:id', async (req, res) => {
  try {
    const record = await HubRoom.findById(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Hub Room record not found'
      });
    }
    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Hub Room record',
      error: error.message
    });
  }
});

// SERVER ROOM ENDPOINTS
app.post('/api/serverroom/save', async (req, res) => {
  try {
    const { date, readings, checkedBy, supervisorName, supervisorSignature } = req.body;

    const serverRoomData = new ServerRoom({
      date: new Date(date),
      readings: readings || [],
      checkedBy,
      supervisorName,
      supervisorSignature
    });

    const savedData = await serverRoomData.save();
    res.status(201).json({
      success: true,
      message: 'Server Room checklist saved successfully',
      data: savedData,
      id: savedData._id
    });
  } catch (error) {
    console.error('Error saving Server Room data:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving Server Room checklist',
      error: error.message
    });
  }
});

app.get('/api/serverroom/all', async (req, res) => {
  try {
    const allRecords = await ServerRoom.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: allRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Server Room records',
      error: error.message
    });
  }
});

app.get('/api/serverroom/:id', async (req, res) => {
  try {
    const record = await ServerRoom.findById(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Server Room record not found'
      });
    }
    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Server Room record',
      error: error.message
    });
  }
});

// UPS ENDPOINTS
app.post('/api/ups/save', async (req, res) => {
  try {
    const { date, upsUnit, readings, checkedBy, supervisorName, supervisorSignature } = req.body;

    const upsData = new UPS({
      date: new Date(date),
      upsUnit,
      readings: readings || [],
      checkedBy,
      supervisorName,
      supervisorSignature
    });

    const savedData = await upsData.save();
    res.status(201).json({
      success: true,
      message: 'UPS checklist saved successfully',
      data: savedData,
      id: savedData._id
    });
  } catch (error) {
    console.error('Error saving UPS data:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving UPS checklist',
      error: error.message
    });
  }
});

app.get('/api/ups/all', async (req, res) => {
  try {
    const allRecords = await UPS.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: allRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching UPS records',
      error: error.message
    });
  }
});

app.get('/api/ups/:id', async (req, res) => {
  try {
    const record = await UPS.findById(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'UPS record not found'
      });
    }
    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching UPS record',
      error: error.message
    });
  }
});

// DELETE endpoints
app.delete('/api/hubroom/:id', async (req, res) => {
  try {
    await HubRoom.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Hub Room record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting record',
      error: error.message
    });
  }
});

app.delete('/api/serverroom/:id', async (req, res) => {
  try {
    await ServerRoom.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Server Room record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting record',
      error: error.message
    });
  }
});

app.delete('/api/ups/:id', async (req, res) => {
  try {
    await UPS.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'UPS record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting record',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date()
  });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   Facility Checklist API Server        ║
  ║   Running on port ${PORT}               ║
  ║   Environment: ${process.env.NODE_ENV}      ║
  ╚════════════════════════════════════════╝
  `);
});

module.exports = app;
