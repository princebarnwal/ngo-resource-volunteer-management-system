from flask import jsonify, request
from models.ngo_model import NGO

def ngo_login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        ngo = NGO.find_by_email(email)
        if ngo and ngo.get('password') == password:
            return jsonify({'success': True, 'ngo': ngo, 'message': 'Login successful'}), 200
        
        return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def ngo_register():
    try:
        data = request.get_json()
        email = data.get('email')
        
        if NGO.find_by_email(email):
            return jsonify({'success': False, 'error': 'Email already exists'}), 400
        
        ngo_id = NGO.create(data)
        return jsonify({'success': True, 'id': ngo_id, 'message': 'NGO registered'}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
