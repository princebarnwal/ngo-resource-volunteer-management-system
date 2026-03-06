from config.database import get_database
from models.ngo_model import NGO
from datetime import datetime, timedelta

db = get_database()

# Get all NGOs
ngos = NGO.find_all()

# Calculate past dates
today = datetime.now()
past_dates = [
    (today - timedelta(days=45)).strftime("%Y-%m-%d"),
    (today - timedelta(days=30)).strftime("%Y-%m-%d"),
]

# Completed events for each NGO
completed_events_data = {
    "Hope Foundation": [
        {
            "title": "Back to School Drive 2024",
            "date": past_dates[1],
            "location": "Hope Foundation Center, NY",
            "description": "Successfully distributed school supplies and uniforms to 200+ underprivileged children."
        },
        {
            "title": "Children's Day Celebration",
            "date": past_dates[0],
            "location": "Community Park, New York",
            "description": "Organized fun activities, games, and meals for 150 children from local communities."
        }
    ],
    "Green Earth Initiative": [
        {
            "title": "Earth Day Cleanup 2024",
            "date": past_dates[1],
            "location": "Golden Gate Park, SF",
            "description": "Cleaned 5 acres of parkland and collected 500kg of waste with 80 volunteers."
        },
        {
            "title": "Recycling Awareness Workshop",
            "date": past_dates[0],
            "location": "Green Earth Center, SF",
            "description": "Educated 100+ community members about proper waste segregation and recycling."
        }
    ]
}

print("Adding completed events to database...\n")

added_count = 0
for ngo in ngos:
    ngo_name = ngo['name']
    ngo_id = ngo['_id']
    
    if ngo_name in completed_events_data:
        print(f"Adding completed events for: {ngo_name}")
        
        for event_data in completed_events_data[ngo_name]:
            # Insert directly to database with completed status
            event_doc = {
                'title': event_data['title'],
                'date': event_data['date'],
                'location': event_data['location'],
                'description': event_data['description'],
                'ngo_id': ngo_id,
                'status': 'completed',  # Make sure this is set correctly
                'created_at': datetime.utcnow()
            }
            
            result = db.events.insert_one(event_doc)
            print(f"  Added: {event_data['title']} (Status: completed)")
            added_count += 1

print(f"\nTotal completed events added: {added_count}")

# Verify the events were added correctly
completed_check = list(db.events.find({"status": "completed"}))
print(f"Verification: {len(completed_check)} completed events now in database")