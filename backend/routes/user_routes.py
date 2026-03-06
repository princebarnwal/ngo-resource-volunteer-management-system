from flask import Blueprint
from controllers.user_controller import get_all_users, get_user, create_user, update_user, delete_user

user_bp = Blueprint('user', __name__)

user_bp.route('/', methods=['GET'])(get_all_users)
user_bp.route('/<user_id>', methods=['GET'])(get_user)
user_bp.route('/', methods=['POST'])(create_user)
user_bp.route('/<user_id>', methods=['PUT'])(update_user)
user_bp.route('/<user_id>', methods=['DELETE'])(delete_user)
