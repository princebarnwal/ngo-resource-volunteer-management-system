from flask import jsonify, request
from models.ngo_model import NGO
import base64

def get_all_ngos():
    try:
        ngos = NGO.find_all()
        return jsonify({'success': True, 'ngos': ngos}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def get_ngo(ngo_id):
    try:
        ngo = NGO.find_by_id(ngo_id)
        if ngo:
            return jsonify({'success': True, 'data': ngo}), 200
        return jsonify({'success': False, 'error': 'NGO not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def create_ngo():
    try:
        data = request.get_json()
        ngo_id = NGO.create(data)
        return jsonify({'success': True, 'id': ngo_id}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def update_ngo(ngo_id):
    try:
        data = request.get_json()
        modified = NGO.update(ngo_id, data)
        if modified:
            return jsonify({'success': True, 'message': 'NGO updated'}), 200
        return jsonify({'success': False, 'error': 'NGO not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def delete_ngo(ngo_id):
    try:
        deleted = NGO.delete(ngo_id)
        if deleted:
            return jsonify({'success': True, 'message': 'NGO deleted'}), 200
        return jsonify({'success': False, 'error': 'NGO not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def update_payment_details(ngo_id):
    try:
        data = request.get_json()
        
        payment_data = {
            'upiId': data.get('upiId'),
            'qrCode': data.get('qrCode')  # Base64 encoded image
        }
        
        modified = NGO.update(ngo_id, {'paymentDetails': payment_data})
        
        if modified:
            return jsonify({'success': True, 'message': 'Payment details updated'}), 200
        return jsonify({'success': False, 'error': 'NGO not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
