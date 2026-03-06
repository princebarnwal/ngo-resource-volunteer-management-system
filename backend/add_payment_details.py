from config.database import get_database
from models.ngo_model import NGO
import base64
import os

db = get_database()

# Read QR code image and convert to base64
qr_image_path = os.path.join(os.path.dirname(__file__), 'payment_qr.png')

try:
    with open(qr_image_path, 'rb') as image_file:
        qr_base64 = base64.b64encode(image_file.read()).decode('utf-8')
        qr_data_url = f"data:image/png;base64,{qr_base64}"
    print("✓ QR code image loaded successfully\n")
except FileNotFoundError:
    print("✗ Error: payment_qr.png not found in backend folder!")
    print("Please save the QR code image as 'payment_qr.png' in the backend folder.")
    exit()

# UPI ID for all NGOs
upi_id = "8451956388-2@ibl"

# Get all NGOs
ngos = NGO.find_all()
python add_payment_details.py
if not ngos:
    print("No NGOs found!")
    exit()

print("Adding payment details to NGOs...\n")

for ngo in ngos:
    ngo_name = ngo['name']
    ngo_id = ngo['_id']
    
    try:
        payment_data = {
            'paymentDetails': {
                'upiId': upi_id,
                'qrCode': qr_data_url
            }
        }
        
        NGO.update(ngo_id, payment_data)
        print(f"✓ Added payment details for: {ngo_name}")
    except Exception as e:
        print(f"✗ Error updating {ngo_name}: {e}")

print(f"\n✅ Payment details added to all {len(ngos)} NGOs!")
print(f"UPI ID: {upi_id}")
print("QR Code: Loaded from payment_qr.png")
