# 🚀 Quick Setup Guide

## Prerequisites
- Python 3.x installed
- Node.js (v18+) installed
- npm or pnpm

## Setup Steps

### 1️⃣ Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2️⃣ Start Backend Server
**Option A - Using the startup script (Windows):**
```bash
# From project root
start-backend.bat
```

**Option B - Manual start:**
```bash
cd backend
python app.py
```

You should see:
```
🚀 NGOConnect Backend Server Starting...
📍 Server running at: http://localhost:5000
✅ CORS enabled for all origins
```

### 3️⃣ Install Frontend Dependencies
```bash
# In a new terminal, from project root
npm install
```

### 4️⃣ Start Frontend
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## ✅ Verify Setup

1. Open browser to `http://localhost:5000` - Should show:
   ```json
   {"message": "NGOConnect API", "status": "running"}
   ```

2. Open `http://localhost:5173` - Should show the NGOConnect app

## 🔐 Test Login

**Volunteer Login:**
- Register a new account first, then login with your credentials

**Admin Login:**
- Register as admin, then login with your credentials

## 🐛 Troubleshooting

### "Error connecting to server"
- ✅ Make sure backend is running on port 5000
- ✅ Check if `http://localhost:5000` is accessible
- ✅ Verify no firewall is blocking the connection

### "Module not found" errors
```bash
cd backend
pip install -r requirements.txt
```

### Port already in use
```bash
# Change port in backend/.env
PORT=5001
```

## 📝 Notes

- The app works **without MongoDB** using in-memory storage
- Data will be lost when server restarts
- For production, configure MongoDB in `.env` file
