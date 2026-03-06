from config.database import get_database

db = get_database()

print("Checking event statuses in database...\n")

# Get all events and their statuses
all_events = list(db.events.find())
print(f"Total events: {len(all_events)}")

status_counts = {}
for event in all_events:
    status = event.get('status', 'No status')
    if status not in status_counts:
        status_counts[status] = 0
    status_counts[status] += 1

print("\nEvent status breakdown:")
for status, count in status_counts.items():
    print(f"  {status}: {count} events")

print("\nFirst 5 events with their statuses:")
for i, event in enumerate(all_events[:5]):
    print(f"{i+1}. {event.get('title')} - Status: '{event.get('status')}'")