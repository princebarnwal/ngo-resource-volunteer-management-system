from config.database import get_database
from models.event_model import Event
from models.ngo_model import NGO
from models.user_model import User
from models.application_model import Application
from datetime import datetime, timedelta
import random

db = get_database()

# Get all NGOs and users
ngos = NGO.find_all()
users = User.find_all()

if not ngos:
    print("No NGOs found! Please run add_sample_ngos.py first.")
    exit()

if not users:
    print("No users found! Please run add_more_users.py first.")
    exit()

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
            "description": "Successfully distributed school supplies and uniforms to 200+ underprivileged children.",
            "status": "completed"
        },
        {
            "title": "Children's Day Celebration",
            "date": past_date2,
            "location": "Community Park, New York",
            "description": "Organized fun activities, games, and meals for 150 children from local communities.",
            "status": "completed"
        }
    ],
    "Green Earth Initiative": [
        {
            "title": "Earth Day Cleanup 2024",
            "date": past_date1,
            "location": "Golden Gate Park, SF",
            "description": "Cleaned 5 acres of parkland and collected 500kg of waste with 80 volunteers.",
            "status": "completed"
        },
        {
            "title": "Recycling Awareness Workshop",
            "date": past_date2,
            "location": "Green Earth Center, SF",
            "description": "Educated 100+ community members about proper waste segregation and recycling.",
            "status": "completed"
        }
    ],
    "Helping Hands Society": [
        {
            "title": "Thanksgiving Food Drive",
            "date": past_date1,
            "location": "Downtown Chicago",
            "description": "Distributed 500 meals to homeless individuals and families in need.",
            "status": "completed"
        },
        {
            "title": "Homeless Shelter Support",
            "date": past_date2,
            "location": "Chicago Shelter Network",
            "description": "Provided blankets, clothing, and hot meals to 200+ shelter residents.",
            "status": "completed"
        }
    ],
    "Bright Future Trust": [
        {
            "title": "College Prep Workshop",
            "date": past_date1,
            "location": "Boston Public Library",
            "description": "Helped 50 students with college applications and scholarship forms.",
            "status": "completed"
        },
        {
            "title": "Youth Mentorship Program Launch",
            "date": past_date2,
            "location": "Bright Future Office, Boston",
            "description": "Matched 30 students with professional mentors for career guidance.",
            "status": "completed"
        }
    ],
    "Health for All": [
        {
            "title": "Rural Health Camp",
            "date": past_date1,
            "location": "Rural Community Center, LA",
            "description": "Provided free health checkups to 300+ rural residents with medical team.",
            "status": "completed"
        },
        {
            "title": "Vaccination Drive",
            "date": past_date2,
            "location": "Health for All Clinic, LA",
            "description": "Administered 200+ vaccinations to children and elderly community members.",
            "status": "completed"
        }
    ],
    "Animal Welfare League": [
        {
            "title": "Pet Adoption Success Day",
            "date": past_date1,
            "location": "Seattle Animal Center",
            "description": "Successfully found homes for 25 rescued animals with loving families.",
            "status": "completed"
        },
        {
            "title": "Animal Care Workshop",
            "date": past_date2,
            "location": "Pet Care Center, Seattle",
            "description": "Educated 60+ pet owners about proper animal care and nutrition.",
            "status": "completed"
        }
    ],
    "Women Empowerment Network": [
        {
            "title": "Women's Entrepreneurship Fair",
            "date": past_date1,
            "location": "Austin Convention Center",
            "description": "Showcased 40 women-led businesses and provided networking opportunities.",
            "status": "completed"
        },
        {
            "title": "Self-Defense Training Camp",
            "date": past_date2,
            "location": "Women's Center, Austin",
            "description": "Trained 80+ women in basic self-defense techniques and safety awareness.",
            "status": "completed"
        }
    ],
    "Senior Care Foundation": [
        {
            "title": "Senior Citizens Health Fair",
            "date": past_date1,
            "location": "Miami Senior Center",
            "description": "Provided health screenings and wellness activities for 120+ elderly residents.",
            "status": "completed"
        },
        {
            "title": "Intergenerational Activity Day",
            "date": past_date2,
            "location": "Community Center, Miami",
            "description": "Connected seniors with youth volunteers for storytelling and games.",
            "status": "completed"
        }
    ],
    "Disaster Relief Corps": [
        {
            "title": "Emergency Preparedness Training",
            "date": past_date1,
            "location": "Relief Training Center, Denver",
            "description": "Trained 100+ volunteers in disaster response and first aid techniques.",
            "status": "completed"
        },
        {
            "title": "Community Safety Workshop",
            "date": past_date2,
            "location": "Denver Community Hall",
            "description": "Educated 150+ residents about emergency preparedness and safety measures.",
            "status": "completed"
        }
    ],
    "Digital Literacy Mission": [
        {
            "title": "Senior Digital Training",
            "date": past_date1,
            "location": "Portland Tech Center",
            "description": "Taught 60+ seniors how to use smartphones and video calling apps.",
            "status": "completed"
        },
        {
            "title": "Rural Internet Setup Drive",
            "date": past_date2,
            "location": "Rural Communities, Portland",
            "description": "Set up internet access points in 5 rural villages, connecting 200+ families.",
            "status": "completed"
        }
    ]
}

print("Adding completed events with volunteers...\n")

added_events = 0
added_applications = 0

for ngo in ngos:
    ngo_name = ngo['name']
    ngo_id = ngo['_id']
    
    if ngo_name in completed_events_data:
        print(f"\nAdding completed events for: {ngo_name}")
        
        for event_data in completed_events_data[ngo_name]:
            try:
                # Create completed event
                event_insert = {
                    'title': event_data['title'],
                    'date': event_data['date'],
                    'location': event_data['location'],
                    'description': event_data['description'],
                    'ngo_id': ngo_id,
                    'status': 'completed',
                    'created_at': datetime.utcnow()
                }
                
                event_id = Event.create_event(db, event_insert)
                print(f"  Added event: {event_data['title']}")
                added_events += 1
                
                # Randomly assign 3-6 volunteers to each completed event
                num_volunteers = random.randint(3, 6)
                selected_volunteers = random.sample(users, min(num_volunteers, len(users)))
                
                for volunteer in selected_volunteers:
                    try:
                        # Create application for volunteer
                        application_data = {
                            'event_id': str(event_id),
                            'event_title': event_data['title'],
                            'volunteer_id': volunteer['_id'],
                            'volunteer_name': volunteer['name'],
                            'volunteer_email': volunteer['email'],
                            'ngo_id': ngo_id
                        }
                        
                        app_id = Application.create_application(db, application_data)
                        
                        # Update application status to accepted (since event is completed)
                        Application.update_status(db, app_id, 'accepted')
                        added_applications += 1
                        
                    except Exception as e:
                        print(f"    Error adding volunteer {volunteer['name']}: {e}")
                
                print(f"    Assigned {num_volunteers} volunteers to this event")
                
            except Exception as e:
                print(f"  Error adding event {event_data['title']}: {e}")

print(f"\n\nSummary:")
print(f"Total completed events added: {added_events}")
print(f"Total volunteer applications created: {added_applications}")
print(f"Each completed event has 3-6 volunteers assigned")
print("\nCompleted events are now visible in the app with their volunteer history!")