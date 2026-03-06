from config.database import get_database
from models.ngo_model import NGO
import hashlib
from datetime import datetime

db = get_database()

sample_ngos = [
    {
        "name": "Hope Foundation",
        "email": "contact@hopefoundation.org",
        "password": "hope123",
        "phone": "+1 555-0101",
        "address": "123 Charity Lane, New York, NY 10001",
        "registrationNumber": "NGO-2020-001",
        "description": "Dedicated to providing education and healthcare to underprivileged children across urban communities."
    },
    {
        "name": "Green Earth Initiative",
        "email": "info@greenearthinitiative.org",
        "password": "green123",
        "phone": "+1 555-0102",
        "address": "456 Eco Street, San Francisco, CA 94102",
        "registrationNumber": "NGO-2019-045",
        "description": "Environmental conservation organization focused on tree plantation, waste management, and climate awareness programs."
    },
    {
        "name": "Helping Hands Society",
        "email": "support@helpinghands.org",
        "password": "help123",
        "phone": "+1 555-0103",
        "address": "789 Care Avenue, Chicago, IL 60601",
        "registrationNumber": "NGO-2021-078",
        "description": "Community welfare organization providing food distribution, shelter, and skill development programs for homeless individuals."
    },
    {
        "name": "Bright Future Trust",
        "email": "admin@brightfuture.org",
        "password": "bright123",
        "phone": "+1 555-0104",
        "address": "321 Education Road, Boston, MA 02101",
        "registrationNumber": "NGO-2018-112",
        "description": "Empowering youth through scholarships, mentorship programs, and career guidance for students from low-income families."
    },
    {
        "name": "Health for All",
        "email": "contact@healthforall.org",
        "password": "health123",
        "phone": "+1 555-0105",
        "address": "654 Medical Plaza, Los Angeles, CA 90001",
        "registrationNumber": "NGO-2020-089",
        "description": "Organizing free health camps, medical checkups, and awareness programs for rural and underserved communities."
    },
    {
        "name": "Animal Welfare League",
        "email": "info@animalwelfare.org",
        "password": "animal123",
        "phone": "+1 555-0106",
        "address": "987 Pet Street, Seattle, WA 98101",
        "registrationNumber": "NGO-2019-156",
        "description": "Rescue, rehabilitation, and adoption services for stray and abandoned animals. Promoting animal rights and welfare."
    },
    {
        "name": "Women Empowerment Network",
        "email": "support@womenempowerment.org",
        "password": "women123",
        "phone": "+1 555-0107",
        "address": "147 Equality Boulevard, Austin, TX 78701",
        "registrationNumber": "NGO-2021-203",
        "description": "Supporting women through skill training, entrepreneurship programs, and legal aid services for gender equality."
    },
    {
        "name": "Senior Care Foundation",
        "email": "contact@seniorcare.org",
        "password": "senior123",
        "phone": "+1 555-0108",
        "address": "258 Elder Avenue, Miami, FL 33101",
        "registrationNumber": "NGO-2020-167",
        "description": "Providing healthcare, companionship, and recreational activities for elderly citizens in need of support."
    },
    {
        "name": "Disaster Relief Corps",
        "email": "emergency@disasterrelief.org",
        "password": "relief123",
        "phone": "+1 555-0109",
        "address": "369 Response Road, Denver, CO 80201",
        "registrationNumber": "NGO-2018-234",
        "description": "Rapid response team providing emergency aid, shelter, and rehabilitation during natural disasters and calamities."
    },
    {
        "name": "Digital Literacy Mission",
        "email": "info@digitalliteracy.org",
        "password": "digital123",
        "phone": "+1 555-0110",
        "address": "741 Tech Park, Portland, OR 97201",
        "registrationNumber": "NGO-2021-298",
        "description": "Bridging the digital divide by providing computer training and internet access to rural and marginalized communities."
    }
]

print("Adding sample NGOs to database...\n")

for ngo_data in sample_ngos:
    try:
        # Hash password
        password = ngo_data['password']
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        # Prepare data
        ngo_insert = {
            'name': ngo_data['name'],
            'email': ngo_data['email'],
            'password': hashed_password,
            'phone': ngo_data['phone'],
            'address': ngo_data['address'],
            'registrationNumber': ngo_data['registrationNumber'],
            'description': ngo_data['description'],
            'created_at': datetime.utcnow()
        }
        
        ngo_id = NGO.create(ngo_insert)
        print(f"✓ Added: {ngo_data['name']} (ID: {ngo_id})")
    except Exception as e:
        print(f"✗ Error adding {ngo_data['name']}: {e}")

print(f"\nTotal NGOs added: {len(sample_ngos)}")
print("\nLogin credentials:")
print("Email: contact@hopefoundation.org | Password: hope123")
print("Email: info@greenearthinitiative.org | Password: green123")
print("...and so on")
