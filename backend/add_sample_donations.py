from config.database import get_database
from models.donation_model import Donation
from models.user_model import User
from models.ngo_model import NGO
import random

db = get_database()

# Get all users and NGOs
users = User.find_all()
ngos = NGO.find_all()

if not users or not ngos:
    print("Need users and NGOs in database first!")
    exit()

print(f"Adding 2-3 donations for each of {len(ngos)} NGOs...\n")

donation_amounts = [500, 1000, 1500, 2000, 2500, 3000, 5000]
messages = [
    "Keep up the great work!",
    "Happy to support your cause",
    "For a better tomorrow",
    "God bless your efforts",
    "Proud to contribute",
    "Making a difference together"
]

total_donations = 0

for ngo in ngos:
    num_donations = random.randint(2, 3)
    selected_users = random.sample(users, min(num_donations, len(users)))
    
    print(f"NGO: {ngo['name']}")
    
    for user in selected_users:
        try:
            donation_data = {
                'donor_id': user['_id'],
                'donor_name': user['name'],
                'donor_email': user['email'],
                'ngo_id': ngo['_id'],
                'amount': random.choice(donation_amounts),
                'message': random.choice(messages)
            }
            
            donation_id = Donation.create_donation(db, donation_data)
            print(f"  ✓ {user['name']} donated ₹{donation_data['amount']}")
            total_donations += 1
        except Exception as e:
            print(f"  ✗ Error: {e}")
    
    print()

print(f"✅ Total donations added: {total_donations}")
