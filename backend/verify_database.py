from config.database import get_database
from models.user_model import User
from models.ngo_model import NGO

db = get_database()

# Count users
users = User.find_all()
print(f"Total Users in Database: {len(users)}")
print("\nSample Users:")
for i, user in enumerate(users[:5]):
    print(f"  {i+1}. {user['name']} ({user['email']})")
if len(users) > 5:
    print(f"  ... and {len(users) - 5} more users")

# Count NGOs
ngos = NGO.find_all()
print(f"\nTotal NGOs in Database: {len(ngos)}")

# Count events
events = list(db.events.find())
completed_events = list(db.events.find({"status": "completed"}))
upcoming_events = list(db.events.find({"status": {"$ne": "completed"}}))

print(f"\nTotal Events: {len(events)}")
print(f"  - Completed Events: {len(completed_events)}")
print(f"  - Upcoming Events: {len(upcoming_events)}")

# Count applications
applications = list(db.applications.find())
accepted_applications = list(db.applications.find({"status": "accepted"}))

print(f"\nTotal Applications: {len(applications)}")
print(f"  - Accepted Applications: {len(accepted_applications)}")

print(f"\nDatabase is ready with:")
print(f"  - {len(users)} volunteer users (password: qwertyuiop)")
print(f"  - {len(ngos)} NGOs with their own passwords")
print(f"  - {len(completed_events)} completed events with volunteer history")
print(f"  - {len(upcoming_events)} upcoming events for volunteering")