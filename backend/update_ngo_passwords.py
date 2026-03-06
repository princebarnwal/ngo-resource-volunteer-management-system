from config.database import get_database
from models.ngo_model import NGO

db = get_database()

# New password for all NGOs
new_password = "qwertyuiop"

# Get all NGOs
ngos = NGO.find_all()

if not ngos:
    print("No NGOs found!")
    exit()

print("Updating passwords for all NGOs...\n")

for ngo in ngos:
    ngo_name = ngo['name']
    ngo_id = ngo['_id']
    
    try:
        NGO.update(ngo_id, {'password': new_password})
        print(f"✓ Updated password for: {ngo_name}")
    except Exception as e:
        print(f"✗ Error updating {ngo_name}: {e}")

print(f"\n✅ All {len(ngos)} NGO passwords updated!")
print(f"New password: {new_password}")
