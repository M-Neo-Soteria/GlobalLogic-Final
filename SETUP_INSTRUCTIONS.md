# Digital Facility Checklist - Backend Setup Guide

## Overview
This project integrates a Node.js/Express backend with MongoDB Atlas to save all checklist data.

---

## Prerequisites

- **Node.js** (v14 or higher) - Download from [nodejs.org](https://nodejs.org)
- **MongoDB Atlas Account** - Sign up at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- **npm** (comes with Node.js)

---

## Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Verify your email

### 1.2 Create a Cluster
1. Click "Create a Deployment"
2. Select "M0 Free" tier
3. Choose cloud provider (AWS recommended)
4. Select your region (closest to your location)
5. Click "Create Cluster"
6. Wait 3-5 minutes for cluster to be ready

### 1.3 Create Database User
1. In MongoDB Atlas, go to "Database Access"
2. Click "Add New Database User"
3. Create username and password (save these!)
4. Set permissions to "Atlas admin"
5. Click "Add User"

### 1.4 Configure IP Whitelist
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add your IP)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Clusters" page
2. Click "Connect" button
3. Select "Drivers"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<username>` with your database username

**Example Connection String:**
```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/facility-checklist?retryWrites=true&w=majority
```

---

## Step 2: Backend Setup

### 2.1 Install Dependencies
Open terminal/PowerShell in your project folder and run:

```bash
npm install
```

This will install:
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Enable cross-origin requests
- **dotenv** - Environment variables
- **body-parser** - Parse request bodies
- **nodemon** (dev) - Auto-restart server

### 2.2 Configure Environment Variables

Edit the `.env` file and update:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/facility-checklist?retryWrites=true&w=majority
NODE_ENV=development
```

**Replace:**
- `YOUR_USERNAME` - Your MongoDB username
- `YOUR_PASSWORD` - Your MongoDB password
- `YOUR_CLUSTER` - Your cluster name from MongoDB Atlas

---

## Step 3: Start the Backend Server

### 3.1 Development Mode (with auto-restart)
```bash
npm run dev
```

### 3.2 Production Mode
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║   Facility Checklist API Server        ║
║   Running on port 5000                 ║
║   Environment: development             ║
╚════════════════════════════════════════╝
```

### 3.3 Test Server Health
Open in browser: [http://localhost:5000/api/health](http://localhost:5000/api/health)

You should get:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## Step 4: Update Frontend HTML Files

### For Each HTML File (HubRoom.html, ServerRoom.html, UPS.html)

Add this before the closing `</body>` tag:

```html
<!-- API Client -->
<script src="api-client.js"></script>

<!-- Checklist Handler Script -->
<script>
// Get the appropriate API client based on page
const checklistType = 'HubRoom'; // Change to 'ServerRoom' or 'UPS' accordingly
let api = HubRoomAPI; // Change to ServerRoomAPI or UPSAPI

// Save button click handler
function saveChecklist() {
  disableSaveButton(true);
  
  // Collect form data
  const formData = {
    date: document.querySelector('input[type="date"]')?.value,
    readings: collectTableData(),
    checkedBy: document.querySelector('input[name="checkedBy"]')?.value,
    supervisorName: document.querySelector('input[name="supervisorName"]')?.value,
    supervisorSignature: document.querySelector('input[name="supervisorSignature"]')?.value
  };

  // For UPS, add UPS unit
  if (checklistType === 'UPS') {
    formData.upsUnit = document.querySelector('select[name="upsUnit"]')?.value;
  }

  console.log('Saving data:', formData);

  // Call appropriate API
  api.save(formData).then(response => {
    disableSaveButton(false);
    
    if (response.success) {
      showNotification(`✓ ${checklistType} checklist saved successfully! ID: ${response.id}`, 'success');
      // Optional: Clear form or redirect
      console.log('Record saved with ID:', response.id);
    } else {
      showNotification(`✗ Error: ${response.message}`, 'error');
      console.error('Save error:', response.error);
    }
  });
}

// Collect table data from all rows
function collectTableData() {
  const readings = [];
  const tableRows = document.querySelectorAll('table tbody tr');
  
  tableRows.forEach(row => {
    const inputs = row.querySelectorAll('input');
    if (inputs.length > 0) {
      const reading = {};
      
      inputs.forEach((input, index) => {
        const name = input.name || input.placeholder || `field_${index}`;
        reading[name] = input.value;
      });
      
      // Only add if row has data
      if (Object.values(reading).some(v => v)) {
        readings.push(reading);
      }
    }
  });
  
  return readings;
}

// Attach save button click
document.addEventListener('DOMContentLoaded', function() {
  const saveBtn = document.querySelector('.btn-save');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveChecklist);
  }
});
</script>
```

---

## Step 5: API Reference

### Hub Room Endpoints

**Save Data:**
```
POST /api/hubroom/save
Body: {
  "date": "2024-01-15",
  "readings": [
    {
      "time": "09:00",
      "temperature": 22.5,
      "humidity": 45,
      "notes": "Normal"
    }
  ],
  "checkedBy": "John Doe",
  "supervisorName": "Jane Smith",
  "supervisorSignature": "Jane Smith"
}
```

**Get All Records:**
```
GET /api/hubroom/all
```

**Get Single Record:**
```
GET /api/hubroom/{id}
```

**Delete Record:**
```
DELETE /api/hubroom/{id}
```

### Server Room Endpoints
- `POST /api/serverroom/save`
- `GET /api/serverroom/all`
- `GET /api/serverroom/{id}`
- `DELETE /api/serverroom/{id}`

### UPS Endpoints
- `POST /api/ups/save`
- `GET /api/ups/all`
- `GET /api/ups/{id}`
- `DELETE /api/ups/{id}`

---

## Step 6: Testing with cURL (PowerShell)

Test Hub Room save endpoint:

```powershell
$body = @{
    date = "2024-01-15"
    readings = @(
        @{
            time = "09:00"
            temperature = 22.5
            humidity = 45
            notes = "Normal"
        }
    )
    checkedBy = "John Doe"
    supervisorName = "Jane Smith"
    supervisorSignature = "Jane Smith"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/hubroom/save" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

---

## Troubleshooting

### "Cannot find module 'express'"
**Solution:** Run `npm install` again

### "MongoDB connection failed"
**Solution:** 
- Check `.env` file has correct connection string
- Verify username/password in connection string
- Check MongoDB Atlas IP whitelist includes your IP
- Wait a few minutes after creating cluster

### "Port 5000 already in use"
**Solution:** 
- Change PORT in `.env` to different port (e.g., 5001)
- Or kill existing process: `npx kill-port 5000`

### "CORS error from frontend"
**Solution:**
- Make sure backend is running on port 5000
- Check `api-client.js` has correct `API_BASE_URL`

---

## File Structure

```
project/
├── server.js              # Main backend server
├── api-client.js          # Frontend API client
├── package.json          # Dependencies
├── .env                  # Configuration (keep secret!)
├── HubRoom.html          # Updated with save functionality
├── ServerRoom.html       # Updated with save functionality
├── UPS.html              # Updated with save functionality
└── index.html            # Landing page
```

---

## MongoDB Data Viewer

View your saved data in MongoDB Atlas:

1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. Select your database: `facility-checklist`
4. Browse collections: `hubrooms`, `serverrooms`, `ups`

---

## Next Steps

1. Start the backend server: `npm run dev`
2. Update your HTML files with the save script
3. Test saving data from the checklist forms
4. View saved data in MongoDB Atlas

---

## Support & Documentation

- **Express.js:** https://expressjs.com/
- **Mongoose:** https://mongoosejs.com/
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Node.js:** https://nodejs.org/en/docs/

---

**Created:** May 2026
**Version:** 1.0.0
