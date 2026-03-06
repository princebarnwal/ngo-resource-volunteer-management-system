import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from flask import Flask
    from flask_cors import CORS
    print("[OK] Flask and Flask-CORS imported successfully")
    
    from routes.auth_routes import auth_bp
    print("[OK] Auth routes imported successfully")
    
    from routes.ngo_routes import ngo_bp
    print("[OK] NGO routes imported successfully")
    
    from routes.user_routes import user_bp
    print("[OK] User routes imported successfully")
    
    print("\n[OK] All imports successful!")
    print("\nYou can now run: python app.py")
    
except Exception as e:
    print(f"[ERROR] {e}")
    import traceback
    traceback.print_exc()
