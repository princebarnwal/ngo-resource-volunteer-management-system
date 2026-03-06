from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
DATABASE_NAME = os.getenv('DATABASE_NAME', 'ngoconnect_db')

try:
    client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
    # Test connection
    client.server_info()
    db = client[DATABASE_NAME]
    print(f"[OK] Connected to MongoDB: {DATABASE_NAME}")
    USE_MONGODB = True
except Exception as e:
    print(f"[WARNING] MongoDB not available: {e}")
    print("[INFO] Using in-memory database fallback")
    db = None
    USE_MONGODB = False

def get_database():
    if USE_MONGODB:
        return db
    else:
        # Return fallback
        from config.database_fallback import get_fallback_db
        return get_fallback_db()
