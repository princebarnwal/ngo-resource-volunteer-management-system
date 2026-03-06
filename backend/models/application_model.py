from datetime import datetime
from bson.objectid import ObjectId

class Application:
    @staticmethod
    def create_application(db, application_data):
        """Create a new volunteer application"""
        application = {
            'event_id': application_data.get('event_id'),
            'event_title': application_data.get('event_title'),
            'volunteer_id': application_data.get('volunteer_id'),
            'volunteer_name': application_data.get('volunteer_name'),
            'volunteer_email': application_data.get('volunteer_email'),
            'ngo_id': application_data.get('ngo_id'),
            'status': 'pending',
            'created_at': datetime.utcnow()
        }
        result = db.applications.insert_one(application)
        return result.inserted_id

    @staticmethod
    def get_ngo_applications(db, ngo_id):
        """Get all applications for an NGO"""
        applications = list(db.applications.find({'ngo_id': ngo_id}).sort('created_at', -1))
        for app in applications:
            app['_id'] = str(app['_id'])
        return applications

    @staticmethod
    def get_volunteer_applications(db, volunteer_id):
        """Get all applications for a volunteer"""
        applications = list(db.applications.find({'volunteer_id': volunteer_id}).sort('created_at', -1))
        for app in applications:
            app['_id'] = str(app['_id'])
        return applications

    @staticmethod
    def get_event_applications(db, event_id):
        """Get all applications for an event"""
        applications = list(db.applications.find({'event_id': event_id}).sort('created_at', -1))
        for app in applications:
            app['_id'] = str(app['_id'])
        return applications

    @staticmethod
    def update_status(db, application_id, status):
        """Update application status"""
        result = db.applications.update_one(
            {'_id': ObjectId(application_id)},
            {'$set': {'status': status}}
        )
        return result.modified_count > 0
