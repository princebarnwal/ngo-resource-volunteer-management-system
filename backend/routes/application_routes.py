from flask import Blueprint
from controllers.application_controller import create_application, get_ngo_applications, get_volunteer_applications, get_event_applications, update_application_status

def create_application_routes(db):
    application_bp = Blueprint('applications', __name__)

    @application_bp.route('/apply', methods=['POST'])
    def apply():
        return create_application(db)

    @application_bp.route('/ngo/<ngo_id>', methods=['GET'])
    def get_ngo_apps(ngo_id):
        return get_ngo_applications(db, ngo_id)

    @application_bp.route('/volunteer/<volunteer_id>', methods=['GET'])
    def get_volunteer_apps(volunteer_id):
        return get_volunteer_applications(db, volunteer_id)

    @application_bp.route('/event/<event_id>', methods=['GET'])
    def get_event_apps(event_id):
        return get_event_applications(db, event_id)

    @application_bp.route('/<application_id>/status', methods=['PUT'])
    def update_status(application_id):
        return update_application_status(db, application_id)

    return application_bp
