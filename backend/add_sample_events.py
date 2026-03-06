from config.database import get_database
from models.event_model import Event
from models.ngo_model import NGO
from datetime import datetime, timedelta

db = get_database()

# Get all NGOs
ngos = NGO.find_all()

if not ngos:
    print("No NGOs found! Please run add_sample_ngos.py first.")
    exit()

# Calculate upcoming dates
today = datetime.now()
date1 = (today + timedelta(days=3)).strftime("%Y-%m-%d")
date2 = (today + timedelta(days=7)).strftime("%Y-%m-%d")

# Sample events for each NGO
events_data = {
    "Hope Foundation": [
        {
            "title": "Free Education Camp 2024",
            "date": date1,
            "location": "Community Center, New York",
            "description": "Free tutoring and educational materials distribution for underprivileged children. Volunteers needed for teaching and coordination."
        },
        {
            "title": "Health Checkup Drive",
            "date": date2,
            "location": "Hope Foundation Center",
            "description": "Free health checkups and medical consultation for children. Need volunteers for registration and crowd management."
        }
    ],
    "Green Earth Initiative": [
        {
            "title": "Tree Plantation Drive",
            "date": date1,
            "location": "Central Park, San Francisco",
            "description": "Plant 1000 trees to combat climate change. Volunteers needed for digging, planting, and watering."
        },
        {
            "title": "Beach Cleanup Campaign",
            "date": date2,
            "location": "Ocean Beach, SF",
            "description": "Clean the beach and collect plastic waste. Bring your enthusiasm and we'll provide the tools!"
        }
    ],
    "Helping Hands Society": [
        {
            "title": "Food Distribution Drive",
            "date": date1,
            "location": "Downtown Chicago",
            "description": "Distribute meals to homeless individuals. Volunteers needed for food packing and distribution."
        },
        {
            "title": "Winter Clothing Donation",
            "date": date2,
            "location": "Helping Hands Center",
            "description": "Collect and distribute winter clothes to those in need. Help us sort and pack donations."
        }
    ],
    "Bright Future Trust": [
        {
            "title": "Career Guidance Workshop",
            "date": date1,
            "location": "Boston Community Hall",
            "description": "Career counseling and resume building workshop for underprivileged youth. Mentors needed."
        },
        {
            "title": "Scholarship Application Camp",
            "date": date2,
            "location": "Bright Future Office",
            "description": "Help students fill scholarship applications. Need volunteers with computer skills."
        }
    ],
    "Health for All": [
        {
            "title": "Free Medical Camp 2024",
            "date": date1,
            "location": "Rural Health Center, LA",
            "description": "Free health checkups, blood pressure monitoring, and basic medicines. Medical and non-medical volunteers welcome."
        },
        {
            "title": "Health Awareness Seminar",
            "date": date2,
            "location": "Community Center, LA",
            "description": "Awareness program on hygiene and preventive healthcare. Volunteers needed for coordination."
        }
    ],
    "Animal Welfare League": [
        {
            "title": "Pet Adoption Fair",
            "date": date1,
            "location": "Seattle Pet Park",
            "description": "Find loving homes for rescued animals. Volunteers needed for setup, registration, and animal care."
        },
        {
            "title": "Stray Animal Rescue Drive",
            "date": date2,
            "location": "Downtown Seattle",
            "description": "Rescue and provide medical care to stray animals. Need volunteers for rescue operations."
        }
    ],
    "Women Empowerment Network": [
        {
            "title": "Skill Development Workshop",
            "date": date1,
            "location": "Women's Center, Austin",
            "description": "Tailoring and handicraft training for women. Volunteers needed to teach and coordinate."
        },
        {
            "title": "Women's Rights Awareness",
            "date": date2,
            "location": "Austin Community Hall",
            "description": "Legal awareness program on women's rights. Need volunteers for event management."
        }
    ],
    "Senior Care Foundation": [
        {
            "title": "Senior Citizens Health Camp",
            "date": date1,
            "location": "Elder Care Center, Miami",
            "description": "Free health checkups and recreational activities for elderly. Volunteers needed for assistance."
        },
        {
            "title": "Companionship Program",
            "date": date2,
            "location": "Senior Care Home, Miami",
            "description": "Spend time with elderly citizens, play games, and share stories. Bring joy to their lives!"
        }
    ],
    "Disaster Relief Corps": [
        {
            "title": "Emergency Response Training",
            "date": date1,
            "location": "Relief Center, Denver",
            "description": "Training on first aid and disaster response. Volunteers will learn emergency management skills."
        },
        {
            "title": "Relief Material Packing",
            "date": date2,
            "location": "Warehouse, Denver",
            "description": "Pack emergency relief kits for disaster-affected areas. Need volunteers for sorting and packing."
        }
    ],
    "Digital Literacy Mission": [
        {
            "title": "Computer Training Camp",
            "date": date1,
            "location": "Tech Center, Portland",
            "description": "Basic computer training for rural youth. Volunteers needed to teach MS Office and internet basics."
        },
        {
            "title": "Digital Awareness Workshop",
            "date": date2,
            "location": "Community Hall, Portland",
            "description": "Teach digital safety and online skills. Need tech-savvy volunteers."
        }
    ]
}

print("Adding sample events for each NGO...\n")

added_count = 0
for ngo in ngos:
    ngo_name = ngo['name']
    ngo_id = ngo['_id']
    
    if ngo_name in events_data:
        print(f"\nAdding events for: {ngo_name}")
        for event_data in events_data[ngo_name]:
            try:
                event_insert = {
                    'title': event_data['title'],
                    'date': event_data['date'],
                    'location': event_data['location'],
                    'description': event_data['description'],
                    'ngo_id': ngo_id,
                    'status': 'upcoming',
                    'created_at': datetime.utcnow()
                }
                
                event_id = Event.create_event(db, event_insert)
                print(f"  ✓ {event_data['title']}")
                added_count += 1
            except Exception as e:
                print(f"  ✗ Error: {e}")

print(f"\n\nTotal events added: {added_count}")
print("Events are now visible in the app!")
