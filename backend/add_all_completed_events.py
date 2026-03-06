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
past_dates = [
    (today - timedelta(days=45)).strftime("%Y-%m-%d"),
    (today - timedelta(days=30)).strftime("%Y-%m-%d"),
    (today - timedelta(days=20)).strftime("%Y-%m-%d"),
    (today - timedelta(days=10)).strftime("%Y-%m-%d")
]

# Completed events for remaining NGOs
remaining_events = {
    "Helping Hands Society": [
        {
            "title": "Winter Warmth Campaign",
            "date": past_dates[0],
            "location": "Downtown Chicago",
            "description": "Distributed warm clothing and blankets to 300+ homeless individuals during winter."
        },
        {
            "title": "Community Kitchen Setup",
            "date": past_dates[1],
            "location": "Helping Hands Center",
            "description": "Established a community kitchen serving 150 meals daily to those in need."
        }
    ],
    "Bright Future Trust": [
        {
            "title": "Scholarship Award Ceremony",
            "date": past_dates[0],
            "location": "Boston Convention Center",
            "description": "Awarded scholarships to 50 deserving students from underprivileged backgrounds."
        },
        {
            "title": "Career Fair 2024",
            "date": past_dates[2],
            "location": "Bright Future Campus",
            "description": "Connected 200+ students with potential employers and internship opportunities."
        }
    ],
    "Health for All": [
        {
            "title": "Mobile Health Unit Launch",
            "date": past_dates[1],
            "location": "Rural Areas, Los Angeles",
            "description": "Launched mobile health units reaching 500+ rural residents with medical care."
        },
        {
            "title": "Mental Health Awareness Week",
            "date": past_dates[2],
            "location": "Health for All Centers",
            "description": "Conducted mental health workshops and counseling sessions for 250+ participants."
        }
    ],
    "Animal Welfare League": [
        {
            "title": "Stray Animal Vaccination Drive",
            "date": past_dates[0],
            "location": "Seattle Streets",
            "description": "Vaccinated 100+ stray animals and provided medical treatment."
        },
        {
            "title": "Pet Owner Education Program",
            "date": past_dates[3],
            "location": "Animal Welfare Center",
            "description": "Educated 80+ pet owners about responsible pet care and animal welfare."
        }
    ],
    "Women Empowerment Network": [
        {
            "title": "Women's Leadership Summit",
            "date": past_dates[1],
            "location": "Austin Conference Hall",
            "description": "Empowered 150+ women through leadership training and networking sessions."
        },
        {
            "title": "Skill Development Graduation",
            "date": past_dates[3],
            "location": "Women's Training Center",
            "description": "Graduated 60+ women from vocational training programs in tailoring and crafts."
        }
    ],
    "Senior Care Foundation": [
        {
            "title": "Senior Health & Wellness Fair",
            "date": past_dates[0],
            "location": "Miami Senior Community",
            "description": "Provided comprehensive health checkups and wellness activities for 200+ seniors."
        },
        {
            "title": "Technology Training for Seniors",
            "date": past_dates[2],
            "location": "Senior Care Center",
            "description": "Taught 50+ seniors how to use smartphones and stay connected with family."
        }
    ],
    "Disaster Relief Corps": [
        {
            "title": "Flood Relief Operation",
            "date": past_dates[0],
            "location": "Affected Areas, Denver",
            "description": "Provided emergency relief to 500+ families affected by recent flooding."
        },
        {
            "title": "Disaster Preparedness Workshop",
            "date": past_dates[3],
            "location": "Community Centers, Denver",
            "description": "Trained 300+ community members in disaster preparedness and response."
        }
    ],
    "Digital Literacy Mission": [
        {
            "title": "Rural School Computer Lab Setup",
            "date": past_dates[1],
            "location": "Rural Schools, Portland",
            "description": "Set up computer labs in 10 rural schools, benefiting 400+ students."
        },
        {
            "title": "Digital Skills Certification Program",
            "date": past_dates[2],
            "location": "Digital Literacy Centers",
            "description": "Certified 120+ individuals in basic computer skills and digital literacy."
        }
    ]
}

print("Adding more completed events for all NGOs...\n")

added_events = 0
added_applications = 0

for ngo in ngos:
    ngo_name = ngo['name']
    ngo_id = ngo['_id']
    
    if ngo_name in remaining_events:
        print(f"Adding completed events for: {ngo_name}")
        
        for event_data in remaining_events[ngo_name]:
            try:
                # Insert completed event directly to database
                event_doc = {
                    'title': event_data['title'],
                    'date': event_data['date'],
                    'location': event_data['location'],
                    'description': event_data['description'],
                    'ngo_id': ngo_id,
                    'status': 'completed',
                    'created_at': datetime.utcnow()
                }
                
                result = db.events.insert_one(event_doc)
                event_id = result.inserted_id
                print(f"  Added: {event_data['title']}")
                added_events += 1
                
                # Randomly assign 3-6 volunteers to each completed event
                num_volunteers = random.randint(3, 6)
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
                            'status': 'accepted',
                            'created_at': datetime.utcnow()
                        }
                        
                        db.applications.insert_one(application_doc)
                        added_applications += 1
                        
                    except Exception as e:
                        print(f"    Error adding volunteer {volunteer['name']}: {e}")
                
                print(f"    Assigned {num_volunteers} volunteers")
                
            except Exception as e:
                print(f"  Error adding event {event_data['title']}: {e}")

print(f"\nFinal Summary:")
print(f"Additional completed events added: {added_events}")
print(f"Additional volunteer applications: {added_applications}")
print("\nAll NGOs now have completed events with volunteer history!")