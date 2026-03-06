from flask import jsonify, request
from models.event_model import Event

def create_event(db):
    """Create a new event"""
    try:
        data = request.get_json()
        
        if not data.get('title') or not data.get('date'):
            return jsonify({'success': False, 'error': 'Title and date are required'}), 400
        
        event_id = Event.create_event(db, data)
        
        return jsonify({
            'success': True,
            'message': 'Event created successfully',
            'event_id': str(event_id)
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def get_all_events(db):
    """Get all upcoming events and delete past ones"""
    try:
        # Delete past events first
        Event.delete_past_events(db)
        
        # Get ngo_id from query params if provided
        ngo_id = request.args.get('ngo_id')
        
        # Get remaining events
        events = Event.get_all_events(db, ngo_id)
        
        return jsonify({
            'success': True,
            'events': events
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def delete_event(db, event_id):
    """Delete a specific event"""
    try:
        success = Event.delete_event(db, event_id)
        
        if success:
            return jsonify({
                'success': True,
                'message': 'Event deleted successfully'
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Event not found'
            }), 404
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
