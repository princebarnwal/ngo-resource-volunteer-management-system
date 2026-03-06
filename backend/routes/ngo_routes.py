from flask import Blueprint
from controllers.ngo_controller import get_all_ngos, get_ngo, create_ngo, update_ngo, delete_ngo, update_payment_details
from controllers.ngo_auth_controller import ngo_login, ngo_register

ngo_bp = Blueprint('ngo', __name__)

ngo_bp.route('/login', methods=['POST'])(ngo_login)
ngo_bp.route('/register', methods=['POST'])(ngo_register)
ngo_bp.route('/all', methods=['GET'])(get_all_ngos)
ngo_bp.route('/<ngo_id>', methods=['GET'])(get_ngo)
ngo_bp.route('/', methods=['POST'])(create_ngo)
ngo_bp.route('/<ngo_id>', methods=['PUT'])(update_ngo)
ngo_bp.route('/<ngo_id>', methods=['DELETE'])(delete_ngo)
ngo_bp.route('/<ngo_id>/payment', methods=['PUT'])(update_payment_details)
