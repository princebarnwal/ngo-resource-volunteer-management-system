from config.database import get_database

db = get_database()
ngos_collection = db['ngos']

ngos = list(ngos_collection.find({}))
print(f"\nTotal NGOs in database: {len(ngos)}")

if len(ngos) > 0:
    print("\nNGOs found:")
    for ngo in ngos:
        print(f"  - {ngo.get('name')} ({ngo.get('email')})")
else:
    print("\nNo NGOs found in database!")
    print("Adding sample NGO...")
    
    sample_ngo = {
        'name': 'Hope Foundation',
        'email': 'contact@hopefoundation.org',
        'password': 'password123',
        'phone': '+1234567890',
        'address': '123 Charity Street, City',
        'registrationNumber': 'NGO-2024-001',
        'description': 'Dedicated to providing education and healthcare to underprivileged communities.'
    }
    
    result = ngos_collection.insert_one(sample_ngo)
    print(f"Sample NGO added with ID: {result.inserted_id}")
