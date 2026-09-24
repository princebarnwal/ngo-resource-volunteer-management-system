from flask import jsonify, request
from models.ngo_model import NGO
from utils.security import hash_password, is_password_hash, public_account, verify_password
from utils.validation import validate_email, validate_password

def ngo_login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'error': 'Request body is required'}), 400
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'success': False, 'error': 'Email and password are required'}), 400
        email_error = validate_email(email)
        password_error = validate_password(password)
        if email_error or password_error:
            return jsonify({'success': False, 'error': email_error or password_error}), 400
        
        ngo = NGO.find_by_email(email)
        if ngo and verify_password(ngo.get('password'), password):
            if not is_password_hash(ngo.get('password')):
                NGO.update(ngo['_id'], {'password': hash_password(password)})
            return jsonify({'success': True, 'ngo': public_account(ngo), 'message': 'Login successful'}), 200
        
        return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def ngo_register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'error': 'Request body is required'}), 400
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'success': False, 'error': 'Email and password are required'}), 400
        email_error = validate_email(email)
        if email_error:
            return jsonify({'success': False, 'error': email_error}), 400
        
        if NGO.find_by_email(email):
            return jsonify({'success': False, 'error': 'Email already exists'}), 400
        
        data = {**data, 'password': hash_password(password)}
        ngo_id = NGO.create(data)
        return jsonify({'success': True, 'id': ngo_id, 'message': 'NGO registered'}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
