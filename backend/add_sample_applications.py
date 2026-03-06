from config.database import get_database
from models.user_model import User
from models.event_model import Event
from models.ngo_model import NGO
from models.application_model import Application
import random
from datetime import datetime

db = get_database()

# Get all users and events
users = User.find_all()
events = Event.get_all_events(db)

if not users:
    print("No users found! Please run add_sample_users.py first.")
    exit()

if not events:
    print("No events found! Please run add_sample_events.py first.")
    exit()

print(f"Found {len(users)} users and {len(events)} events\n")
print("Creating applications...\n")

total_applications = 0

for event in events:
    # Randomly select 5-6 volunteers for each event
    num_volunteers = random.randint(5, 6)
    selected_users = random.sample(users, num_volunteers)
    
    print(f"Event: {event['title']}")
    
    for user in selected_users:
        try:
            application_data = {
                'volunteer_id': user['_id'],
                'volunteer_name': user['name'],
                'volunteer_email': user['email'],
                'event_id': event['_id'],
                'event_title': event['title'],
                'ngo_id': event['ngo_id']
            }
            
            app_id = Application.create_application(db, application_data)
            print(f"  ✓ {user['name']} applied")
            total_applications += 1
        except Exception as e:
            print(f"  ✗ Error: {e}")
    
    print()

print(f"✅ Total applications created: {total_applications}")
print(f"Average {total_applications / len(events):.1f} applications per event")
