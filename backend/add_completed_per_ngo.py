from config.database import get_database
from models.event_model import Event
from models.ngo_model import NGO
from models.user_model import User
from models.application_model import Application
from datetime import datetime, timedelta
import random

db = get_database()
ngos = NGO.find_all()
users = User.find_all()

events_data = [
    {"title": "Winter Relief Drive", "location": "City Center"},
    {"title": "Community Health Camp", "location": "Local Clinic"},
    {"title": "Education Workshop", "location": "School Hall"},
    {"title": "Food Distribution", "location": "Community Kitchen"},
    {"title": "Awareness Campaign", "location": "Public Park"},
    {"title": "Skill Training Session", "location": "Training Center"},
    {"title": "Cleanup Drive", "location": "Beach Area"},
    {"title": "Medical Checkup Camp", "location": "Health Center"},
    {"title": "Youth Mentorship", "location": "Youth Center"},
    {"title": "Senior Care Program", "location": "Care Home"}
]

past_dates = [
    (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d"),
    (datetime.now() - timedelta(days=20)).strftime("%Y-%m-%d")
]

added = 0
for ngo in ngos:
    num_events = random.randint(1, 2)
    for i in range(num_events):
        event_data = random.choice(events_data)
        event_id = Event.create_event(db, {
            'title': f"{event_data['title']} - {ngo['name'][:15]}",
            'date': random.choice(past_dates),
            'location': event_data['location'],
            'description': f"Successfully completed {event_data['title']}.",
            'ngo_id': ngo['_id'],
            'status': 'completed'
        })
        
        num_volunteers = random.randint(4, 5)
        selected = random.sample(users, min(num_volunteers, len(users)))
        
        for vol in selected:
            app_id = Application.create_application(db, {
                'event_id': str(event_id),
                'event_title': event_data['title'],
                'volunteer_id': vol['_id'],
                'volunteer_name': vol['name'],
                'volunteer_email': vol['email'],
                'ngo_id': ngo['_id']
            })
            Application.update_status(db, app_id, 'accepted')
        
        added += 1
        print(f"{ngo['name']}: {event_data['title']} ({num_volunteers} volunteers)")

print(f"\nAdded {added} completed events across {len(ngos)} NGOs")
