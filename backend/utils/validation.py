import re


EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def validate_email(email: object) -> str:
    if not isinstance(email, str) or not EMAIL_PATTERN.fullmatch(email.strip()):
        return "Please enter a valid email address"
    return ""


def validate_password(password: object) -> str:
    if not isinstance(password, str) or len(password) < 8:
        return "Password must be at least 8 characters"
    return ""
