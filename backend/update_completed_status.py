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

past_date = (datetime.now() - timedelta(days=25)).strftime("%Y-%m-%d")

completed_events = {
    "Hope Foundation": {"title": "Book Donation Campaign", "location": "Hope Center, NY"},
    "Green Earth Initiative": {"title": "Beach Cleanup Drive", "location": "Ocean Beach, SF"},
    "Helping Hands Society": {"title": "Winter Blanket Distribution", "location": "Chicago Streets"},
    "Bright Future Trust": {"title": "Scholarship Application Workshop", "location": "Boston School"},
    "Health for All": {"title": "Blood Donation Camp", "location": "Health Center, LA"},
    "Animal Welfare League": {"title": "Pet Vaccination Drive", "location": "Seattle Clinic"},
    "Women Empowerment Network": {"title": "Financial Literacy Workshop", "location": "Austin Hall"},
    "Senior Care Foundation": {"title": "Senior Fitness Program", "location": "Miami Park"},
    "Disaster Relief Corps": {"title": "Flood Relief Training", "location": "Denver Center"},
    "Digital Literacy Mission": {"title": "Social Media Safety Workshop", "location": "Portland Library"}
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
