from flask import jsonify, request
from models.donation_model import Donation

def create_donation(db):
    """Create a new donation"""
    try:
        data = request.get_json()
        
        if not data.get('ngo_id') or not data.get('amount'):
            return jsonify({'success': False, 'error': 'NGO and amount required'}), 400
        
        donation_id = Donation.create_donation(db, data)
        
        return jsonify({
            'success': True,
            'message': 'Donation recorded successfully',
            'donation_id': str(donation_id)
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def get_ngo_donations(db, ngo_id):
    """Get all donations for an NGO"""
    try:
        donations = Donation.get_ngo_donations(db, ngo_id)
        
        return jsonify({
            'success': True,
            'donations': donations
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
