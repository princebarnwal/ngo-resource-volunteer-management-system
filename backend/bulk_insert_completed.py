from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client['ngoconnect_db']

events = [
    {"title": "Winter Clothing Drive", "ngo_id": "698ed4acbad7bcde138b9b22"},
    {"title": "Community Health Camp", "ngo_id": "698ed4acbad7bcde138b9b22"},
    {"title": "Tree Plantation Drive", "ngo_id": "698ed4acbad7bcde138b9b23"},
    {"title": "Beach Cleanup Campaign", "ngo_id": "698ed4acbad7bcde138b9b23"},
    {"title": "Food Distribution Drive", "ngo_id": "698ed4acbad7bcde138b9b24"},
    {"title": "Blanket Distribution", "ngo_id": "698ed4acbad7bcde138b9b24"},
    {"title": "Career Workshop", "ngo_id": "698ed4acbad7bcde138b9b25"},
    {"title": "Scholarship Camp", "ngo_id": "698ed4acbad7bcde138b9b25"},
    {"title": "Medical Checkup Camp", "ngo_id": "698ed4acbad7bcde138b9b26"},
    {"title": "Vaccination Drive", "ngo_id": "698ed4acbad7bcde138b9b26"},
    {"title": "Pet Adoption Fair", "ngo_id": "698ed4acbad7bcde138b9b27"},
    {"title": "Animal Care Workshop", "ngo_id": "698ed4acbad7bcde138b9b27"},
    {"title": "Women's Skill Workshop", "ngo_id": "698ed4acbad7bcde138b9b28"},
    {"title": "Self Defense Training", "ngo_id": "698ed4acbad7bcde138b9b28"},
    {"title": "Senior Health Fair", "ngo_id": "698ed4acbad7bcde138b9b29"},
    {"title": "Elder Care Program", "ngo_id": "698ed4acbad7bcde138b9b29"},
    {"title": "First Aid Training", "ngo_id": "698ed4acbad7bcde138b9b2a"},
    {"title": "Emergency Drill", "ngo_id": "698ed4acbad7bcde138b9b2a"},
    {"title": "Computer Training", "ngo_id": "698ed4acbad7bcde138b9b2b"},
    {"title": "Digital Safety Workshop", "ngo_id": "698ed4acbad7bcde138b9b2b"}
]

docs = []
for e in events:
    docs.append({
        "title": e["title"],
        "date": "2025-01-15",
        "location": "Community Center",
        "description": f"Successfully completed {e['title']}",
        "status": "completed",
        "ngo_id": ObjectId(e["ngo_id"]),
        "created_at": datetime.now()
    })

result = db.events.insert_many(docs)
print(f"Inserted {len(result.inserted_ids)} completed events")
