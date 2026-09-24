from flask import jsonify, request
from models.user_model import User
from utils.security import hash_password, is_password_hash, public_account, verify_password

def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'error': 'Request body is required'}), 400
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'success': False, 'error': 'Email and password are required'}), 400
        
        if User.find_by_email(email):
            return jsonify({'success': False, 'error': 'Email already exists'}), 400
        
        data = {**data, 'password': hash_password(password)}
        user_id = User.create(data)
        user = User.find_by_id(user_id)
        return jsonify({'success': True, 'data': public_account(user), 'message': 'User registered'}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'error': 'Request body is required'}), 400
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'success': False, 'error': 'Email and password are required'}), 400
        
        user = User.find_by_email(email)
        if user and verify_password(user.get('password'), password):
            if not is_password_hash(user.get('password')):
                User.update(user['_id'], {'password': hash_password(password)})
            return jsonify({'success': True, 'user': public_account(user), 'message': 'Login successful'}), 200
        
        return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
