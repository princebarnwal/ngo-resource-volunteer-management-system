from config.database import get_database
from models.ngo_model import NGO
from datetime import datetime, timedelta
import random

db = get_database()
ngos = NGO.find_all()
past_date = (datetime.now() - timedelta(days=25)).strftime("%Y-%m-%d")

added = 0
for ngo in ngos:
    num = random.randint(1, 2)
    for i in range(num):
        db.events.insert_one({
            'title': f'Completed Event {i+1} - {ngo["name"][:20]}',
            'date': past_date,
            'location': 'Community Center',
            'description': 'Successfully completed',
            'ngo_id': ngo['_id'],
            'status': 'completed',
            'created_at': datetime.now()
        })
        added += 1
        print(f'{ngo["name"]}: Event {i+1}')

print(f'\nAdded {added} completed events')
