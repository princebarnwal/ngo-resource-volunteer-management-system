from flask import Blueprint
from controllers.event_controller import create_event, get_all_events, delete_event

def create_event_routes(db):
    event_bp = Blueprint('events', __name__)

    @event_bp.route('/create', methods=['POST'])
    def create():
        return create_event(db)

    @event_bp.route('/all', methods=['GET'])
    def get_all():
        return get_all_events(db)

    @event_bp.route('/delete/<event_id>', methods=['DELETE'])
    def delete(event_id):
        return delete_event(db, event_id)

    return event_bp
