import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv
load_dotenv()

print("=" * 50)
print("MongoDB Connection Test")
print("=" * 50)

MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
DATABASE_NAME = os.getenv('DATABASE_NAME', 'ngoconnect_db')

print(f"\nConnection String: {MONGODB_URI}")
print(f"Database Name: {DATABASE_NAME}\n")

try:
    from pymongo import MongoClient
    print("[OK] pymongo module found")
    
    client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
    print("[OK] MongoDB client created")
    
    # Test connection
    client.server_info()
    print("[OK] Successfully connected to MongoDB!")
    
    db = client[DATABASE_NAME]
    print(f"[OK] Database '{DATABASE_NAME}' accessible")
    
    # List collections
    collections = db.list_collection_names()
    if collections:
        print(f"[OK] Existing collections: {', '.join(collections)}")
    else:
        print("[INFO] No collections yet (will be created on first use)")
    
    print("\n" + "=" * 50)
    print("SUCCESS: MongoDB is ready to use!")
    print("=" * 50)
    
except Exception as e:
    print(f"\n[ERROR] MongoDB connection failed: {e}")
    print("\n" + "=" * 50)
    print("FALLBACK: App will use in-memory database")
    print("=" * 50)
    print("\nTo use MongoDB, see MONGODB_SETUP.md for installation instructions")
