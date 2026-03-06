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

if not ngos or not users:
    print("No NGOs or users found!")
    exit()

past_date = (datetime.now() - timedelta(days=20)).strftime("%Y-%m-%d")

completed_events = {
    "Hope Foundation": {"title": "Winter Clothing Drive", "location": "Hope Center, NY"},
    "Green Earth Initiative": {"title": "Tree Plantation Drive", "location": "Central Park, SF"},
    "Helping Hands Society": {"title": "Community Kitchen Service", "location": "Downtown, Chicago"},
    "Bright Future Trust": {"title": "Career Guidance Workshop", "location": "Boston Library"},
    "Health for All": {"title": "Free Medical Checkup Camp", "location": "Community Center, LA"},
    "Animal Welfare League": {"title": "Stray Animal Rescue Drive", "location": "Seattle Streets"},
    "Women Empowerment Network": {"title": "Skill Development Workshop", "location": "Austin Center"},
    "Senior Care Foundation": {"title": "Elder Care Health Camp", "location": "Miami Center"},
    "Disaster Relief Corps": {"title": "First Aid Training Session", "location": "Denver Hall"},
    "Digital Literacy Mission": {"title": "Computer Basics Training", "location": "Portland Tech Hub"}
}

added = 0
for ngo in ngos:
    if ngo['name'] in completed_events:
        event_data = completed_events[ngo['name']]
        event_id = Event.create_event(db, {
            'title': event_data['title'],
            'date': past_date,
            'location': event_data['location'],
            'description': f"Successfully completed {event_data['title']} with community participation.",
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
        
        print(f"[OK] {ngo['name']}: {event_data['title']} ({num_volunteers} volunteers)")
        added += 1

print(f"\nAdded {added} completed events")
