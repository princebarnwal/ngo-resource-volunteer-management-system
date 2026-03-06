from flask import jsonify, request
from models.application_model import Application

def create_application(db):
    """Create a new volunteer application"""
    try:
        data = request.get_json()
        
        if not data.get('event_id') or not data.get('volunteer_id'):
            return jsonify({'success': False, 'error': 'Event and volunteer required'}), 400
        
        app_id = Application.create_application(db, data)
        
        return jsonify({
            'success': True,
            'message': 'Application submitted successfully',
            'application_id': str(app_id)
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def get_ngo_applications(db, ngo_id):
    """Get all applications for an NGO"""
    try:
        applications = Application.get_ngo_applications(db, ngo_id)
        
        return jsonify({
            'success': True,
            'applications': applications
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def get_volunteer_applications(db, volunteer_id):
    """Get all applications for a volunteer"""
    try:
        applications = Application.get_volunteer_applications(db, volunteer_id)
        
        return jsonify({
            'success': True,
            'applications': applications
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def get_event_applications(db, event_id):
    """Get all applications for an event"""
    try:
        applications = Application.get_event_applications(db, event_id)
        
        return jsonify({
            'success': True,
            'applications': applications
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def update_application_status(db, application_id):
    """Update application status"""
    try:
        data = request.get_json()
        status = data.get('status')
        
        success = Application.update_status(db, application_id, status)
        
        if success:
            return jsonify({
                'success': True,
                'message': 'Application status updated'
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Application not found'
            }), 404
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
