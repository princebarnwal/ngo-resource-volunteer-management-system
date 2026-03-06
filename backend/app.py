from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from config.database import get_database
from routes.ngo_routes import ngo_bp
from routes.user_routes import user_bp
from routes.auth_routes import auth_bp
from routes.event_routes import create_event_routes
from routes.application_routes import create_application_routes
from routes.donation_routes import create_donation_routes

load_dotenv()

app = Flask(__name__)
CORS(app)

db = get_database()

app.register_blueprint(ngo_bp, url_prefix='/api/ngos')
app.register_blueprint(user_bp, url_prefix='/api/users')
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(create_event_routes(db), url_prefix='/api/events')
app.register_blueprint(create_application_routes(db), url_prefix='/api/applications')
app.register_blueprint(create_donation_routes(db), url_prefix='/api/donations')

@app.route('/')
def home():
    return {'message': 'NGOConnect API', 'status': 'running'}

@app.route('/health')
def health():
    return {'status': 'healthy', 'database': 'connected'}

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    print(f"\nNGOConnect Backend Server Starting...")
    print(f"Server running at: http://localhost:{port}")
    print(f"CORS enabled for all origins\n")
    app.run(debug=True, port=port, host='0.0.0.0')
