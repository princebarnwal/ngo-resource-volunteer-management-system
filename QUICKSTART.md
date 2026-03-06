# 🎯 NGOConnect - Quick Reference

## 🚀 Starting the App

```
┌─────────────────────────────────────────┐
│  EASIEST WAY - Double Click:           │
│  ► start-app.bat                        │
└─────────────────────────────────────────┘

OR

┌─────────────────────────────────────────┐
│  TERMINAL 1 (Backend):                  │
│  cd backend                             │
│  python app.py                          │
│                                         │
│  ✓ Server running at:                  │
│    http://localhost:5000                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  TERMINAL 2 (Frontend):                 │
│  npm run dev                            │
│                                         │
│  ✓ App running at:                     │
│    http://localhost:5173                │
└─────────────────────────────────────────┘
```

## 🔐 First Time Use

```
1. Open http://localhost:5173
   ↓
2. Click "New volunteer? Register here"
   ↓
3. Fill registration form
   ↓
4. Click REGISTER
   ↓
5. Login with your credentials
   ↓
6. Explore the app! 🎉
```

## 🎭 User Roles

```
┌──────────────────┐         ┌──────────────────┐
│   VOLUNTEER      │         │      ADMIN       │
├──────────────────┤         ├──────────────────┤
│ • View tasks     │         │ • Manage users   │
│ • See events     │         │ • Create events  │
│ • Track history  │         │ • Assign tasks   │
│ • Update profile │         │ • View reports   │
└──────────────────┘         └──────────────────┘
```

## 🛠️ Troubleshooting

```
Problem: "Error connecting to server"
Solution: Start backend server
         cd backend && python app.py

Problem: Port already in use
Solution: Kill process or change port
         netstat -ano | findstr :5000

Problem: Module not found
Solution: Install dependencies
         pip install -r requirements.txt
```

## 📂 Project Structure

```
NGOConnect/
├── backend/              ← Python Flask API
│   ├── app.py           ← Main server file
│   ├── controllers/     ← Business logic
│   ├── models/          ← Data models
│   └── routes/          ← API endpoints
│
├── src/                 ← React Frontend
│   ├── app/            ← Components
│   └── styles/         ← CSS files
│
├── start-app.bat       ← One-click starter
├── RUN.md              ← Detailed instructions
└── README.md           ← Project overview
```

## 🌐 API Endpoints

```
Backend: http://localhost:5000

GET  /                    → Server status
GET  /health              → Health check
POST /api/auth/register   → Register user
POST /api/auth/login      → User login
POST /api/ngos/login      → Admin login
```

## ✅ Checklist

```
□ Python 3.x installed
□ Node.js installed
□ Dependencies installed (pip install -r requirements.txt)
□ Backend running (python app.py)
□ Frontend running (npm run dev)
□ Browser open to http://localhost:5173
□ Account registered
□ Successfully logged in
```

## 🎉 Success Indicators

```
✓ Backend shows: "Server running at: http://localhost:5000"
✓ Frontend shows: "Local: http://localhost:5173/"
✓ Browser loads NGOConnect splash screen
✓ Can register and login without errors
✓ Dashboard loads after login
```

---

**Need more help?** Check RUN.md or SETUP.md for detailed guides!
