# NGOConnect Backend API

Flask REST API with MongoDB integration for NGOConnect.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Install and start MongoDB locally or use MongoDB Atlas

3. Configure environment variables in `.env` file

For MongoDB Atlas, set `MONGODB_URI` to the connection string copied from
Atlas **Connect → Drivers** and set `DATABASE_NAME` to the database name.
Never commit `.env` or expose `MONGODB_URI` in frontend code.

For a Vercel frontend, set `CORS_ORIGINS` to the exact Vercel URL, for example:
```env
CORS_ORIGINS=https://ngo-resource-volunteer-management-s.vercel.app
```

4. Run the application:
```bash
python app.py
```

For production, run with a WSGI server:
```bash
gunicorn app:app
```

The deployed frontend must also define this Vercel environment variable and
then be redeployed:
```env
VITE_API_URL=https://ngoconnect-backend.onrender.com
```

## API Endpoints

### NGOs
- GET `/api/ngos` - Get all NGOs
- GET `/api/ngos/<id>` - Get NGO by ID
- POST `/api/ngos` - Create new NGO
- PUT `/api/ngos/<id>` - Update NGO
- DELETE `/api/ngos/<id>` - Delete NGO

### Users
- GET `/api/users` - Get all users
- GET `/api/users/<id>` - Get user by ID
- POST `/api/users` - Create new user
- PUT `/api/users/<id>` - Update user
- DELETE `/api/users/<id>` - Delete user
