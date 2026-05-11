# 🏢 Digital Facility Checklist - Complete Backend Solution

A full-stack solution for saving digital facility checklists with **Node.js/Express backend** and **MongoDB Atlas** database.

---

## 📦 What's Included

### Backend Files
- **`server.js`** - Express server with MongoDB integration
- **`api-client.js`** - Frontend API client library
- **`package.json`** - Node.js dependencies
- **`.env`** - Environment configuration (UPDATE REQUIRED)
- **`.env.example`** - Example configuration template

### Handlers (Specific to each checklist type)
- **`hubroom-handler.js`** - Hub Room checklist save logic
- **`serverroom-handler.js`** - Server Room checklist save logic
- **`ups-handler.js`** - UPS checklist save logic

### Frontend
- **`dashboard.html`** - View and manage all saved records
- **Your existing HTML files** - Need to add 2 script tags

### Documentation
- **`QUICK_START.md`** - Fast 5-minute setup
- **`SETUP_INSTRUCTIONS.md`** - Detailed setup guide
- **`INTEGRATION_GUIDE.md`** - How to integrate into your code
- **`HTML_MODIFICATION_EXAMPLES.md`** - Exact code examples
- **`README.md`** - This file

---

## ⚡ Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up MongoDB Atlas
Visit: https://www.mongodb.com/cloud/atlas

1. Create free account
2. Create M0 cluster
3. Create database user
4. Whitelist your IP
5. Copy connection string

### 3. Configure .env File
Edit `.env` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/facility-checklist?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### 4. Start Backend Server
```bash
npm start
```

Expected output:
```
✓ MongoDB Connected Successfully
Running on port 5000
```

### 5. Add Scripts to Your HTML Files

**For HubRoom.html** - Add before `</body>`:
```html
<script src="api-client.js"></script>
<script src="hubroom-handler.js"></script>
```

**For ServerRoom.html** - Add before `</body>`:
```html
<script src="api-client.js"></script>
<script src="serverroom-handler.js"></script>
```

**For UPS.html** - Add before `</body>`:
```html
<script src="api-client.js"></script>
<script src="ups-handler.js"></script>
```

### 6. Test
1. Open HubRoom.html in browser
2. Fill in test data
3. Click "Save Data" button
4. You should see: ✓ Hub Room checklist saved successfully!
5. Check MongoDB Atlas > Collections to see your data

---

## 📊 Database Schema

### Hub Room Collection
```json
{
  "_id": "ObjectId",
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
  "supervisorSignature": "Jane Smith",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Server Room Collection
```json
{
  "_id": "ObjectId",
  "date": "2024-01-15",
  "readings": [
    {
      "time": "09:00",
      "temperature": 22.5,
      "humidity": 45,
      "airFlow": "Normal",
      "cableManagement": "Good",
      "notes": "Normal"
    }
  ],
  "checkedBy": "John Doe",
  "supervisorName": "Jane Smith",
  "supervisorSignature": "Jane Smith",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### UPS Collection
```json
{
  "_id": "ObjectId",
  "date": "2024-01-15",
  "upsUnit": "UPS-1",
  "readings": [
    {
      "time": "09:00",
      "inputVoltage": 230,
      "inputFrequency": 50,
      "batteryVoltage": 432,
      "batteryCapacity": 100,
      "outputVoltage": 230,
      "outputFrequency": 50,
      "outputPower": 5000,
      "temperature": 25,
      "alarmStatus": "Normal",
      "notes": "All Good"
    }
  ],
  "checkedBy": "John Doe",
  "supervisorName": "Jane Smith",
  "supervisorSignature": "Jane Smith",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

## 🔌 API Endpoints

### Hub Room Endpoints
```
POST   /api/hubroom/save       - Save new record
GET    /api/hubroom/all        - Get all records
GET    /api/hubroom/:id        - Get specific record
DELETE /api/hubroom/:id        - Delete record
```

### Server Room Endpoints
```
POST   /api/serverroom/save    - Save new record
GET    /api/serverroom/all     - Get all records
GET    /api/serverroom/:id     - Get specific record
DELETE /api/serverroom/:id     - Delete record
```

### UPS Endpoints
```
POST   /api/ups/save           - Save new record
GET    /api/ups/all            - Get all records
GET    /api/ups/:id            - Get specific record
DELETE /api/ups/:id            - Delete record
```

### Health Check
```
GET    /api/health             - Check server status
```

---

## 📊 Dashboard

Open `dashboard.html` to:
- View all checklist records
- Filter by type (Hub Room, Server Room, UPS)
- See record details
- Delete records
- Auto-refreshes every 30 seconds

---

## 🛠️ Development Commands

```bash
# Start server (auto-restart on changes)
npm run dev

# Start server (production)
npm start

# Install dependencies
npm install

# View server logs
# Check the terminal where you ran npm start
```

---

## 📝 Example Usage

### Save from JavaScript
```javascript
const data = {
  date: '2024-01-15',
  readings: [
    { time: '09:00', temperature: 22.5, humidity: 45, notes: 'Normal' }
  ],
  checkedBy: 'John Doe',
  supervisorName: 'Jane Smith',
  supervisorSignature: 'Jane Smith'
};

HubRoomAPI.save(data).then(response => {
  console.log(response);
  // { success: true, message: "...", id: "..." }
});
```

### Load Record
```javascript
loadHubRoomData('mongodb-record-id');
```

### Get All Records
```javascript
HubRoomAPI.getAll().then(response => {
  console.log(response.data); // Array of records
});
```

---

## 🐛 Troubleshooting

### Server Won't Start
```
Error: Cannot find module 'express'
→ Run: npm install
```

### MongoDB Connection Failed
```
Error: MongoDB connection failed
→ Check .env file has correct connection string
→ Check username/password in connection string
→ Check IP is whitelisted in MongoDB Atlas
```

### Port 5000 Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
→ Change PORT in .env to 5001
→ Or: npx kill-port 5000
```

### Save Button Not Working
```
Error: Failed to fetch from http://localhost:5000
→ Backend must be running (npm start)
→ Check API_BASE_URL in api-client.js
→ Check browser console (F12) for errors
```

### CORS Error
```
Error: Access to fetch blocked by CORS
→ Make sure backend is running on port 5000
→ CORS is enabled in server.js
→ Try opening from http://localhost instead of file://
```

---

## 📚 File Structure

```
GlobalLogic Final/
├── server.js                     # Express backend
├── api-client.js                 # Frontend API client
├── hubroom-handler.js            # Hub Room logic
├── serverroom-handler.js         # Server Room logic
├── ups-handler.js                # UPS logic
├── dashboard.html                # Data dashboard
├── package.json                  # Dependencies
├── .env                          # Configuration (SECRET!)
├── .env.example                  # Example config
├── HubRoom.html                  # Update: add scripts
├── ServerRoom.html               # Update: add scripts
├── UPS.html                      # Update: add scripts
├── index.html                    # Landing page
├── README.md                     # This file
├── QUICK_START.md               # 5-minute setup
├── SETUP_INSTRUCTIONS.md        # Detailed guide
├── INTEGRATION_GUIDE.md         # Integration steps
└── HTML_MODIFICATION_EXAMPLES.md # Code examples
```

---

## ✅ Checklist

- [ ] Install Node.js from nodejs.org
- [ ] Run `npm install`
- [ ] Create MongoDB Atlas account
- [ ] Create cluster and user
- [ ] Copy connection string
- [ ] Update `.env` file with connection string
- [ ] Run `npm start`
- [ ] Add script tags to HubRoom.html
- [ ] Add script tags to ServerRoom.html
- [ ] Add script tags to UPS.html
- [ ] Test save functionality
- [ ] View data in MongoDB Atlas
- [ ] Open dashboard.html to see all records

---

## 🔐 Security Notes

⚠️ **Important:**
- Never share your `.env` file
- Never commit `.env` to Git
- Never share your MongoDB password
- Use strong passwords for database
- In production, use proper environment variable management

---

## 📞 Support

For issues:
1. Check browser console (F12)
2. Check server terminal logs
3. Check MongoDB Atlas connection
4. Review SETUP_INSTRUCTIONS.md
5. Check INTEGRATION_GUIDE.md

---

## 🎓 Learning Resources

- **Express.js**: https://expressjs.com/
- **Mongoose**: https://mongoosejs.com/
- **MongoDB**: https://docs.mongodb.com/
- **Node.js**: https://nodejs.org/en/docs/

---

## 📄 License

This project is provided as-is for facility management use.

---

## 🚀 What's Next?

After basic setup, you can add:
- Email notifications when checklist is saved
- Role-based access control
- Data analytics and reporting
- Mobile app support
- Automated reminders
- Export to PDF/Excel

---

## 📞 Questions?

Refer to:
1. **Quick Setup?** → Read `QUICK_START.md`
2. **Detailed Steps?** → Read `SETUP_INSTRUCTIONS.md`
3. **How to integrate?** → Read `INTEGRATION_GUIDE.md`
4. **Code examples?** → Read `HTML_MODIFICATION_EXAMPLES.md`

---

**Version:** 1.0.0  
**Created:** January 2024  
**Backend:** Node.js/Express  
**Database:** MongoDB Atlas

---

## 🎉 You're Ready!

Your facility checklist now has:
- ✓ Professional backend server
- ✓ Cloud database (MongoDB Atlas)
- ✓ Automatic data saving
- ✓ Data dashboard
- ✓ Full API for management

**Start with:** `npm start` then open `dashboard.html` 🚀
