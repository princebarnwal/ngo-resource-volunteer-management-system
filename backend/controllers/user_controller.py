from flask import jsonify, request
from models.user_model import User

def get_all_users():
    try:
        users = User.find_all()
        return jsonify({'success': True, 'data': users}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def get_user(user_id):
    try:
        user = User.find_by_id(user_id)
        if user:
            return jsonify({'success': True, 'data': user}), 200
        return jsonify({'success': False, 'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def create_user():
    try:
        data = request.get_json()
        user_id = User.create(data)
        return jsonify({'success': True, 'id': user_id}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def update_user(user_id):
    try:
        data = request.get_json()
        modified = User.update(user_id, data)
        if modified:
            return jsonify({'success': True, 'message': 'User updated'}), 200
        return jsonify({'success': False, 'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def delete_user(user_id):
    try:
        deleted = User.delete(user_id)
        if deleted:
            return jsonify({'success': True, 'message': 'User deleted'}), 200
        return jsonify({'success': False, 'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
