from bson import ObjectId
from config.database import get_database

db = get_database()
ngo_collection = db['ngos']

class NGO:
    @staticmethod
    def create(data):
        result = ngo_collection.insert_one(data)
        return str(result.inserted_id)
    
    @staticmethod
    def find_all():
        ngos = list(ngo_collection.find())
        for ngo in ngos:
            ngo['_id'] = str(ngo['_id'])
        return ngos
    
    @staticmethod
    def find_by_id(ngo_id):
        ngo = ngo_collection.find_one({'_id': ObjectId(ngo_id)})
        if ngo:
            ngo['_id'] = str(ngo['_id'])
        return ngo
    
    @staticmethod
    def find_by_email(email):
        ngo = ngo_collection.find_one({'email': email})
        if ngo:
            ngo['_id'] = str(ngo['_id'])
        return ngo
    
    @staticmethod
    def update(ngo_id, data):
        result = ngo_collection.update_one(
            {'_id': ObjectId(ngo_id)},
            {'$set': data}
        )
        return result.modified_count
    
    @staticmethod
    def delete(ngo_id):
        result = ngo_collection.delete_one({'_id': ObjectId(ngo_id)})
        return result.deleted_count
