from flask import Blueprint
from controllers.donation_controller import create_donation, get_ngo_donations

def create_donation_routes(db):
    donation_bp = Blueprint('donations', __name__)

    @donation_bp.route('/create', methods=['POST'])
    def create():
        return create_donation(db)

    @donation_bp.route('/ngo/<ngo_id>', methods=['GET'])
    def get_ngo_donations_route(ngo_id):
        return get_ngo_donations(db, ngo_id)

    return donation_bp
