import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from config.database import get_database

db = get_database()

print("\n" + "="*60)
print("EXISTING DATABASE USERS")
print("="*60)

users = list(db['users'].find())
if users:
    print(f"\nFound {len(users)} user(s):\n")
    for i, user in enumerate(users, 1):
        print(f"{i}. Email: {user.get('email')}")
        print(f"   Name: {user.get('name', 'N/A')}")
        print(f"   Role: {user.get('role', 'volunteer')}")
        print(f"   Password: {user.get('password', 'N/A')}")
        print()
else:
    print("\nNo users found in database")

print("="*60)
print("NGO/ADMIN ACCOUNTS")
print("="*60)

ngos = list(db['ngos'].find())
if ngos:
    print(f"\nFound {len(ngos)} NGO(s):\n")
    for i, ngo in enumerate(ngos, 1):
        print(f"{i}. Email: {ngo.get('email')}")
        print(f"   Name: {ngo.get('name', 'N/A')}")
        print(f"   Password: {ngo.get('password', 'N/A')}")
        print()
else:
    print("\nNo NGOs found in database")

print("="*60)
print("\nYou can login with any of the above credentials!")
print("="*60)
