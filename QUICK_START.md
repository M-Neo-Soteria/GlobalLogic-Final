# Quick Start Guide - Digital Facility Checklist

## 🚀 Installation & Deployment (5 Minutes)

### Step 1: Install Node.js
Download from: https://nodejs.org/ (LTS recommended)

### Step 2: Open Terminal in Project Folder
```bash
cd "c:\Users\scc0000538\Desktop\Kunj\Fw_ Require QR code base Digital Check list\GlobalLogic Final"
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Create MongoDB Atlas Cluster

**Visit:** https://www.mongodb.com/cloud/atlas

1. Create free account
2. Create a cluster (M0 Free tier)
3. Create database user
4. Add your IP to whitelist
5. Copy connection string

### Step 5: Configure .env File

Edit `.env` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@yourCluster.mongodb.net/facility-checklist?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### Step 6: Start Backend Server

```bash
npm start
```

You should see:
```
✓ MongoDB Connected Successfully
Running on port 5000
```

---

## 🔌 Add Save Functionality to HTML Files

### For HubRoom.html

Add these lines before `</body>`:

```html
<script src="api-client.js"></script>
<script src="hubroom-handler.js"></script>
```

### For ServerRoom.html

Add these lines before `</body>`:

```html
<script src="api-client.js"></script>
<script src="serverroom-handler.js"></script>
```

### For UPS.html

Add these lines before `</body>`:

```html
<script src="api-client.js"></script>
<script src="ups-handler.js"></script>
```

---

## ✅ Test It Works

1. Open HubRoom.html in browser
2. Fill in some test data
3. Click "Save Data" button
4. You should see success message: ✓ Hub Room checklist saved successfully!
5. Go to MongoDB Atlas > Browse Collections to see your data

---

## 📊 API Endpoints (for testing)

### Health Check
```
GET http://localhost:5000/api/health
```

### Save Hub Room Data
```
POST http://localhost:5000/api/hubroom/save
```

### View All Records
```
GET http://localhost:5000/api/hubroom/all
GET http://localhost:5000/api/serverroom/all
GET http://localhost:5000/api/ups/all
```

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| Module not found | Run `npm install` |
| MongoDB connection error | Check .env file and MongoDB Atlas IP whitelist |
| Port 5000 in use | Change PORT in .env or `npx kill-port 5000` |
| Save button doesn't work | Check browser console (F12) for errors |
| CORS error | Make sure backend is running and `api-client.js` path is correct |

---

## 📁 Project Files

| File | Purpose |
|------|---------|
| `server.js` | Node.js/Express backend server |
| `api-client.js` | Frontend API communication |
| `package.json` | Dependencies list |
| `.env` | Configuration (keep secret) |
| `hubroom-handler.js` | HubRoom save logic |
| `serverroom-handler.js` | ServerRoom save logic |
| `ups-handler.js` | UPS save logic |

---

## 🔐 Security Notes

- ⚠️ Never commit `.env` file to Git
- ⚠️ Keep MongoDB password secret
- ⚠️ Use strong database passwords
- ⚠️ In production, use environment variables instead of .env

---

## 📚 Full Documentation

See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for detailed information.

---

**Ready?** Start the server with `npm start` and fill out your first checklist! 🎉
