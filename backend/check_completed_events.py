from config.database import get_database

db = get_database()

print("Checking completed events in database...\n")

# Get all events
all_events = list(db.events.find())
print(f"Total events in database: {len(all_events)}")

# Filter completed events
completed_events = [event for event in all_events if event.get('status') == 'completed']
print(f"Completed events: {len(completed_events)}")

# Show first few completed events
print("\nFirst 3 completed events:")
for i, event in enumerate(completed_events[:3]):
    print(f"{i+1}. {event.get('title')} - Status: {event.get('status')} - NGO: {event.get('ngo_id')}")

# Check events by NGO
print("\nCompleted events by NGO:")
ngo_events = {}
for event in completed_events:
    ngo_id = str(event.get('ngo_id'))
    if ngo_id not in ngo_events:
        ngo_events[ngo_id] = []
    ngo_events[ngo_id].append(event.get('title'))

for ngo_id, events in ngo_events.items():
    print(f"NGO {ngo_id}: {len(events)} completed events")
    for event_title in events:
        print(f"  - {event_title}")