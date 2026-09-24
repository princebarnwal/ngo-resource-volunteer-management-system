import hashlib
from typing import Any

from werkzeug.security import check_password_hash, generate_password_hash


def hash_password(password: str) -> str:
    return generate_password_hash(password)


def verify_password(stored_password: Any, submitted_password: str) -> bool:
    if not isinstance(stored_password, str) or not isinstance(submitted_password, str):
        return False

    if is_password_hash(stored_password):
        return check_password_hash(stored_password, submitted_password)

    # Support records created by the old sample scripts until they are upgraded.
    legacy_hash = hashlib.sha256(submitted_password.encode("utf-8")).hexdigest()
    return stored_password == legacy_hash


def is_password_hash(password: Any) -> bool:
    return isinstance(password, str) and password.startswith(("pbkdf2:", "scrypt:"))


def public_account(account: dict) -> dict:
    return {key: value for key, value in account.items() if key != "password"}
