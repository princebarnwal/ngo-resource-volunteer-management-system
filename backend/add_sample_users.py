from config.database import get_database
from models.user_model import User
import hashlib
from datetime import datetime

db = get_database()

# Password for all users
password = "qwertyuiop"
hashed_password = hashlib.sha256(password.encode()).hexdigest()

sample_users = [
    {
        "name": "Rahul Sharma",
        "email": "rahul.sharma@gmail.com",
        "phone": "+91 9876543210",
        "skills": ["Teaching & Mentoring", "Event Planning"],
        "availability": "Weekends"
    },
    {
        "name": "Priya Patel",
        "email": "priya.patel@gmail.com",
        "phone": "+91 9876543211",
        "skills": ["Healthcare Support", "Community Outreach"],
        "availability": "Weekdays"
    },
    {
        "name": "Amit Kumar",
        "email": "amit.kumar@gmail.com",
        "phone": "+91 9876543212",
        "skills": ["Web Development", "Graphic Design"],
        "availability": "Evenings"
    },
    {
        "name": "Sneha Reddy",
        "email": "sneha.reddy@gmail.com",
        "phone": "+91 9876543213",
        "skills": ["Social Media Management", "Content Writing"],
        "availability": "Weekends"
    },
    {
        "name": "Vikram Singh",
        "email": "vikram.singh@gmail.com",
        "phone": "+91 9876543214",
        "skills": ["Food Distribution", "Disaster Relief"],
        "availability": "Weekdays"
    },
    {
        "name": "Anjali Gupta",
        "email": "anjali.gupta@gmail.com",
        "phone": "+91 9876543215",
        "skills": ["Child Welfare", "Teaching & Mentoring"],
        "availability": "Weekends"
    },
    {
        "name": "Rohan Mehta",
        "email": "rohan.mehta@gmail.com",
        "phone": "+91 9876543216",
        "skills": ["Event Planning", "Fundraising"],
        "availability": "Evenings"
    },
    {
        "name": "Kavya Iyer",
        "email": "kavya.iyer@gmail.com",
        "phone": "+91 9876543217",
        "skills": ["Healthcare Support", "Elderly Care"],
        "availability": "Weekdays"
    },
    {
        "name": "Arjun Nair",
        "email": "arjun.nair@gmail.com",
        "phone": "+91 9876543218",
        "skills": ["Environmental Conservation", "Community Outreach"],
        "availability": "Weekends"
    },
    {
        "name": "Divya Joshi",
        "email": "divya.joshi@gmail.com",
        "phone": "+91 9876543219",
        "skills": ["Photography & Videography", "Social Media Management"],
        "availability": "Evenings"
    },
    {
        "name": "Karan Verma",
        "email": "karan.verma@gmail.com",
        "phone": "+91 9876543220",
        "skills": ["Legal Aid", "Counseling & Support"],
        "availability": "Weekdays"
    },
    {
        "name": "Neha Kapoor",
        "email": "neha.kapoor@gmail.com",
        "phone": "+91 9876543221",
        "skills": ["Teaching & Mentoring", "Child Welfare"],
        "availability": "Weekends"
    },
    {
        "name": "Siddharth Rao",
        "email": "siddharth.rao@gmail.com",
        "phone": "+91 9876543222",
        "skills": ["Web Development", "Administrative Support"],
        "availability": "Evenings"
    },
    {
        "name": "Pooja Desai",
        "email": "pooja.desai@gmail.com",
        "phone": "+91 9876543223",
        "skills": ["Fundraising", "Event Planning"],
        "availability": "Weekdays"
    },
    {
        "name": "Aditya Malhotra",
        "email": "aditya.malhotra@gmail.com",
        "phone": "+91 9876543224",
        "skills": ["Disaster Relief", "Food Distribution"],
        "availability": "Weekends"
    }
]

print("Adding sample volunteer users...\n")

for user_data in sample_users:
    try:
        user_insert = {
            'name': user_data['name'],
            'email': user_data['email'],
            'phone': user_data['phone'],
            'password': hashed_password,
            'skills': user_data['skills'],
            'availability': user_data['availability'],
            'role': 'volunteer',
            'created_at': datetime.now()
        }
        
        user_id = User.create(user_insert)
        print(f"✓ Added: {user_data['name']} ({user_data['email']})")
    except Exception as e:
        print(f"✗ Error adding {user_data['name']}: {e}")

print(f"\n✅ Total users added: {len(sample_users)}")
print(f"Password for all users: {password}")
print("\nSample login:")
print("Email: rahul.sharma@gmail.com")
print("Password: qwertyuiop")
