from datetime import datetime
from bson.objectid import ObjectId

class Donation:
    @staticmethod
    def create_donation(db, donation_data):
        """Create a new donation"""
        donation = {
            'donor_id': donation_data.get('donor_id'),
            'donor_name': donation_data.get('donor_name'),
            'donor_email': donation_data.get('donor_email'),
            'ngo_id': donation_data.get('ngo_id'),
            'amount': donation_data.get('amount'),
            'message': donation_data.get('message', ''),
            'created_at': datetime.utcnow()
        }
        result = db.donations.insert_one(donation)
        return result.inserted_id

    @staticmethod
    def get_ngo_donations(db, ngo_id):
        """Get all donations for an NGO"""
        donations = list(db.donations.find({'ngo_id': ngo_id}).sort('created_at', -1))
        for donation in donations:
            donation['_id'] = str(donation['_id'])
        return donations
