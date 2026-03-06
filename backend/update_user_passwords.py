from config.database import get_database

db = get_database()

# New password for all users
new_password = "qwertyuiop"

# Update all users directly in database
result = db.users.update_many(
    {},
    {'$set': {'password': new_password}}
)

print(f"✅ Updated {result.modified_count} user passwords!")
print(f"Password: {new_password}")
