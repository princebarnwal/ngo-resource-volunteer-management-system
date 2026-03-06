from flask import jsonify, request
from models.user_model import User

def register():
    try:
        data = request.get_json()
        email = data.get('email')
        
        if User.find_by_email(email):
            return jsonify({'success': False, 'error': 'Email already exists'}), 400
        
        user_id = User.create(data)
        user = User.find_by_id(user_id)
        return jsonify({'success': True, 'data': user, 'message': 'User registered'}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        user = User.find_by_email(email)
        if user and user.get('password') == password:
            return jsonify({'success': True, 'user': user, 'message': 'Login successful'}), 200
        
        return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
