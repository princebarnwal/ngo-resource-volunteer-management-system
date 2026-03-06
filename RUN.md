# NGOConnect - Running Instructions

## ✅ Setup Complete!

All backend dependencies are installed and verified. Follow these steps to run the application:

## 🚀 Start the Application

### Step 1: Start Backend Server

Open a terminal and run:

```bash
cd backend
python app.py
```

You should see:
```
NGOConnect Backend Server Starting...
Server running at: http://localhost:5000
CORS enabled for all origins

 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://localhost:5000
```

**Keep this terminal open!**

### Step 2: Start Frontend (New Terminal)

Open a NEW terminal and run:

```bash
npm run dev
```

You should see:
```
VITE v6.4.1  ready in XXX ms

➜  Local:   http://localhost:5173/
```

### Step 3: Open the Application

Open your browser and go to: **http://localhost:5173**

## 🔐 Using the Application

### First Time Setup:

1. **Register a Volunteer Account:**
   - Click "New volunteer? Register here"
   - Fill in the form
   - Click REGISTER
   - You'll be redirected to login

2. **Login:**
   - Enter your email and password
   - Select "Volunteer" or "Admin"
   - Click LOGIN

### Test Credentials (After Registration):
- Use the email and password you registered with

## 🐛 Troubleshooting

### "Error connecting to server"
**Solution:** Make sure the backend is running
```bash
cd backend
python app.py
```

### Backend won't start
**Solution:** Check if port 5000 is already in use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend won't start
**Solution:** Install dependencies
```bash
npm install
```

## 📝 Important Notes

- **No MongoDB Required:** The app uses in-memory storage
- **Data Persistence:** Data is lost when server restarts
- **Development Mode:** Both servers run in development mode with hot reload

## 🎯 Features to Test

✅ User Registration
✅ User Login (Volunteer/Admin)
✅ Admin Dashboard
✅ Volunteer Dashboard
✅ Volunteer Management
✅ Donation Management
✅ Event Management
✅ Volunteer Assignment
✅ Reports & Analytics

## 📞 Need Help?

Check the SETUP.md file for detailed troubleshooting steps.
