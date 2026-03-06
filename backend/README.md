# NGOConnect Backend API

Flask REST API with MongoDB integration for NGOConnect.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Install and start MongoDB locally or use MongoDB Atlas

3. Configure environment variables in `.env` file

4. Run the application:
```bash
python app.py
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
