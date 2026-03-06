from config.database import get_database
from models.ngo_model import NGO
from models.user_model import User
from datetime import datetime, timedelta
import random

db = get_database()

# Get all NGOs and users
ngos = NGO.find_all()
users = User.find_all()

# Calculate past dates for completed events
today = datetime.now()
past_date1 = (today - timedelta(days=30)).strftime("%Y-%m-%d")
past_date2 = (today - timedelta(days=15)).strftime("%Y-%m-%d")

# Completed events data for each NGO
completed_events_data = {
    "Hope Foundation": [
        {
            "title": "Back to School Drive 2024",
            "date": past_date1,
            "location": "Hope Foundation Center, NY",
            "description": "Successfully distributed school supplies and uniforms to 200+ underprivileged children."
        },
        {
            "title": "Children's Day Celebration",
            "date": past_date2,
            "location": "Community Park, New York",
            "description": "Organized fun activities, games, and meals for 150 children from local communities."
        }
    ],
    "Green Earth Initiative": [
        {
            "title": "Earth Day Cleanup 2024",
            "date": past_date1,
            "location": "Golden Gate Park, SF",
            "description": "Cleaned 5 acres of parkland and collected 500kg of waste with 80 volunteers."
        },
        {
            "title": "Recycling Awareness Workshop",
            "date": past_date2,
            "location": "Green Earth Center, SF",
            "description": "Educated 100+ community members about proper waste segregation and recycling."
        }
    ]
}

print("Adding completed events directly to database...\n")

added_events = 0
added_applications = 0

for ngo in ngos:
    ngo_name = ngo['name']
    ngo_id = ngo['_id']
    
    if ngo_name in completed_events_data:
        print(f"Adding completed events for: {ngo_name}")
        
        for event_data in completed_events_data[ngo_name]:
            try:
                # Insert completed event directly to database
                event_doc = {
                    'title': event_data['title'],
                    'date': event_data['date'],
                    'location': event_data['location'],
                    'description': event_data['description'],
                    'ngo_id': ngo_id,
                    'status': 'completed',  # Set as completed
                    'created_at': datetime.utcnow()
                }
                
                result = db.events.insert_one(event_doc)
                event_id = result.inserted_id
                print(f"  Added: {event_data['title']}")
                added_events += 1
                
                # Randomly assign 3-5 volunteers to each completed event
                num_volunteers = random.randint(3, 5)
                selected_volunteers = random.sample(users, min(num_volunteers, len(users)))
                
                for volunteer in selected_volunteers:
                    try:
                        # Create application directly in database
                        application_doc = {
                            'event_id': str(event_id),
                            'event_title': event_data['title'],
                            'volunteer_id': volunteer['_id'],
                            'volunteer_name': volunteer['name'],
                            'volunteer_email': volunteer['email'],
                            'ngo_id': ngo_id,
                            'status': 'accepted',  # Already accepted since event is completed
                            'created_at': datetime.utcnow()
                        }
                        
                        db.applications.insert_one(application_doc)
                        added_applications += 1
                        
                    except Exception as e:
                        print(f"    Error adding volunteer {volunteer['name']}: {e}")
                
                print(f"    Assigned {num_volunteers} volunteers")
                
            except Exception as e:
                print(f"  Error adding event {event_data['title']}: {e}")

print(f"\nSummary:")
print(f"Completed events added: {added_events}")
print(f"Volunteer applications created: {added_applications}")
print("Completed events are now in the database!")