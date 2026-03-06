# MongoDB Setup Guide for NGOConnect

## Option 1: Install MongoDB Locally (Recommended)

### Windows Installation

1. **Download MongoDB Community Server:**
   - Go to: https://www.mongodb.com/try/download/community
   - Select: Windows x64
   - Download and run the installer

2. **Install MongoDB:**
   - Choose "Complete" installation
   - Install as a Service (recommended)
   - Install MongoDB Compass (GUI tool)

3. **Verify Installation:**
   ```bash
   mongod --version
   ```

4. **Start MongoDB Service:**
   ```bash
   net start MongoDB
   ```

### Configuration

Your `.env` file is already configured:
```env
MONGODB_URI=mongodb://localhost:27017/
DATABASE_NAME=ngoconnect_db
PORT=5000
```

## Option 2: Use MongoDB Atlas (Cloud - Free)

### Setup MongoDB Atlas

1. **Create Account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster:**
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Setup Database Access:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Save credentials!

4. **Setup Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Confirm

5. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password

6. **Update `.env` file:**
   ```env
   MONGODB_URI=mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   DATABASE_NAME=ngoconnect_db
   PORT=5000
   ```

## Option 3: Use Docker (Advanced)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Verify Connection

Run the backend server:
```bash
cd backend
python app.py
```

You should see:
```
[OK] Connected to MongoDB: ngoconnect_db
```

If you see:
```
[WARNING] MongoDB not available
[INFO] Using in-memory database fallback
```

Then MongoDB is not running or connection failed.

## Troubleshooting

### MongoDB Service Not Running (Windows)
```bash
# Start service
net start MongoDB

# Check status
sc query MongoDB
```

### Connection Refused
- Check if MongoDB is running on port 27017
- Verify firewall settings
- Check `.env` configuration

### Authentication Failed
- Verify username/password in connection string
- Check database user permissions

## Using MongoDB Compass (GUI)

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. You'll see `ngoconnect_db` database after first registration
4. Browse collections: `users`, `ngos`

## Benefits of Using MongoDB

✅ **Persistent Data** - Data survives server restarts
✅ **Scalable** - Can handle large amounts of data
✅ **Flexible Schema** - Easy to modify data structure
✅ **Production Ready** - Same setup for deployment

## Fallback Mode

If MongoDB is not available, the app automatically uses in-memory storage:
- ⚠️ Data is lost when server restarts
- ✅ Perfect for quick testing
- ✅ No setup required

---

**Choose what works best for you:**
- **Quick Testing** → Use fallback (no setup needed)
- **Development** → Install MongoDB locally
- **Production** → Use MongoDB Atlas
