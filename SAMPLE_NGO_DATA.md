# Sample NGO Data for Testing

## NGO 1: Hope Foundation
```json
{
  "name": "Hope Foundation",
  "email": "contact@hopefoundation.org",
  "password": "hope123",
  "phone": "+1 555-0101",
  "address": "123 Charity Lane, New York, NY 10001",
  "registrationNumber": "NGO-2020-001",
  "description": "Dedicated to providing education and healthcare to underprivileged children across urban communities."
}
```

## NGO 2: Green Earth Initiative
```json
{
  "name": "Green Earth Initiative",
  "email": "info@greenearthinitiative.org",
  "password": "green123",
  "phone": "+1 555-0102",
  "address": "456 Eco Street, San Francisco, CA 94102",
  "registrationNumber": "NGO-2019-045",
  "description": "Environmental conservation organization focused on tree plantation, waste management, and climate awareness programs."
}
```

## NGO 3: Helping Hands Society
```json
{
  "name": "Helping Hands Society",
  "email": "support@helpinghands.org",
  "password": "help123",
  "phone": "+1 555-0103",
  "address": "789 Care Avenue, Chicago, IL 60601",
  "registrationNumber": "NGO-2021-078",
  "description": "Community welfare organization providing food distribution, shelter, and skill development programs for homeless individuals."
}
```

## NGO 4: Bright Future Trust
```json
{
  "name": "Bright Future Trust",
  "email": "admin@brightfuture.org",
  "password": "bright123",
  "phone": "+1 555-0104",
  "address": "321 Education Road, Boston, MA 02101",
  "registrationNumber": "NGO-2018-112",
  "description": "Empowering youth through scholarships, mentorship programs, and career guidance for students from low-income families."
}
```

## NGO 5: Health for All
```json
{
  "name": "Health for All",
  "email": "contact@healthforall.org",
  "password": "health123",
  "phone": "+1 555-0105",
  "address": "654 Medical Plaza, Los Angeles, CA 90001",
  "registrationNumber": "NGO-2020-089",
  "description": "Organizing free health camps, medical checkups, and awareness programs for rural and underserved communities."
}
```

## NGO 6: Animal Welfare League
```json
{
  "name": "Animal Welfare League",
  "email": "info@animalwelfare.org",
  "password": "animal123",
  "phone": "+1 555-0106",
  "address": "987 Pet Street, Seattle, WA 98101",
  "registrationNumber": "NGO-2019-156",
  "description": "Rescue, rehabilitation, and adoption services for stray and abandoned animals. Promoting animal rights and welfare."
}
```

## NGO 7: Women Empowerment Network
```json
{
  "name": "Women Empowerment Network",
  "email": "support@womenempowerment.org",
  "password": "women123",
  "phone": "+1 555-0107",
  "address": "147 Equality Boulevard, Austin, TX 78701",
  "registrationNumber": "NGO-2021-203",
  "description": "Supporting women through skill training, entrepreneurship programs, and legal aid services for gender equality."
}
```

## NGO 8: Senior Care Foundation
```json
{
  "name": "Senior Care Foundation",
  "email": "contact@seniorcare.org",
  "password": "senior123",
  "phone": "+1 555-0108",
  "address": "258 Elder Avenue, Miami, FL 33101",
  "registrationNumber": "NGO-2020-167",
  "description": "Providing healthcare, companionship, and recreational activities for elderly citizens in need of support."
}
```

## NGO 9: Disaster Relief Corps
```json
{
  "name": "Disaster Relief Corps",
  "email": "emergency@disasterrelief.org",
  "password": "relief123",
  "phone": "+1 555-0109",
  "address": "369 Response Road, Denver, CO 80201",
  "registrationNumber": "NGO-2018-234",
  "description": "Rapid response team providing emergency aid, shelter, and rehabilitation during natural disasters and calamities."
}
```

## NGO 10: Digital Literacy Mission
```json
{
  "name": "Digital Literacy Mission",
  "email": "info@digitalliteracy.org",
  "password": "digital123",
  "phone": "+1 555-0110",
  "address": "741 Tech Park, Portland, OR 97201",
  "registrationNumber": "NGO-2021-298",
  "description": "Bridging the digital divide by providing computer training and internet access to rural and marginalized communities."
}
```

---

## How to Add to Database

### Method 1: Via Registration Page
1. Go to login page
2. Click "Register your organization or NGO"
3. Fill in the details from above
4. Submit

### Method 2: Via Python Script
Create `backend/add_sample_ngos.py`:

```python
from config.database import get_database
from models.ngo_model import NGO

db = get_database()

ngos = [
    {
        "name": "Hope Foundation",
        "email": "contact@hopefoundation.org",
        "password": "hope123",
        "phone": "+1 555-0101",
        "address": "123 Charity Lane, New York, NY 10001",
        "registrationNumber": "NGO-2020-001",
        "description": "Dedicated to providing education and healthcare to underprivileged children."
    },
    # Add more NGOs here...
]

for ngo_data in ngos:
    try:
        ngo_id = NGO.create_ngo(db, ngo_data)
        print(f"Added: {ngo_data['name']} - ID: {ngo_id}")
    except Exception as e:
        print(f"Error adding {ngo_data['name']}: {e}")
```

Run: `python backend/add_sample_ngos.py`

### Method 3: Direct MongoDB Insert
```javascript
db.ngos.insertMany([
  {
    name: "Hope Foundation",
    email: "contact@hopefoundation.org",
    password: "hashed_password_here",
    phone: "+1 555-0101",
    address: "123 Charity Lane, New York, NY 10001",
    registrationNumber: "NGO-2020-001",
    description: "Dedicated to providing education and healthcare.",
    created_at: new Date()
  }
  // Add more...
])
```

---

## Login Credentials

All NGOs use simple passwords for testing:
- **Email:** As listed above
- **Password:** `[name]123` (e.g., `hope123`, `green123`)

**Example:**
- Email: `contact@hopefoundation.org`
- Password: `hope123`
