from config.database import get_database
from models.ngo_model import NGO

db = get_database()

print("Testing API endpoint for completed events...\n")

# Get Hope Foundation NGO
ngos = NGO.find_all()
hope_foundation = None
for ngo in ngos:
    if ngo['name'] == 'Hope Foundation':
        hope_foundation = ngo
        break

if hope_foundation:
    ngo_id = hope_foundation['_id']
    print(f"Hope Foundation NGO ID: {ngo_id}")
    
    # Test the same query the API uses
    all_events = list(db.events.find({'ngo_id': ngo_id}))
    print(f"Total events for Hope Foundation: {len(all_events)}")
    
    completed_events = [event for event in all_events if event.get('status') == 'completed']
    print(f"Completed events for Hope Foundation: {len(completed_events)}")
    
    print("\nAll events for Hope Foundation:")
    for event in all_events:
        print(f"  - {event.get('title')} (Status: {event.get('status')})")
        
    print("\nCompleted events for Hope Foundation:")
    for event in completed_events:
        print(f"  - {event.get('title')} (Status: {event.get('status')})")
else:
    print("Hope Foundation not found!")