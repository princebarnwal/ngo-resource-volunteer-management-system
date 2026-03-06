from datetime import datetime

class Event:
    @staticmethod
    def create_event(db, event_data):
        """Create a new event"""
        event = {
            'title': event_data.get('title'),
            'date': event_data.get('date'),
            'location': event_data.get('location'),
            'description': event_data.get('description'),
            'status': event_data.get('status', 'Upcoming'),
            'ngo_id': event_data.get('ngo_id'),
            'created_at': datetime.utcnow()
        }
        result = db.events.insert_one(event)
        return result.inserted_id

    @staticmethod
    def get_all_events(db, ngo_id=None):
        """Get all events, optionally filtered by NGO"""
        query = {}
        if ngo_id:
            query['ngo_id'] = ngo_id
        events = list(db.events.find(query))
        for event in events:
            event['_id'] = str(event['_id'])
        return events

    @staticmethod
    def delete_event(db, event_id):
        """Delete an event by ID"""
        from bson.objectid import ObjectId
        result = db.events.delete_one({'_id': ObjectId(event_id)})
        return result.deleted_count > 0

    @staticmethod
    def delete_past_events(db):
        """Delete events that have passed their date"""
        current_date = datetime.utcnow().strftime('%Y-%m-%d')
        result = db.events.delete_many({'date': {'$lt': current_date}})
        return result.deleted_count
