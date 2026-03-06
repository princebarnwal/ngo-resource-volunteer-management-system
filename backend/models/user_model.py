from bson import ObjectId
from config.database import get_database

db = get_database()
user_collection = db['users']

class User:
    @staticmethod
    def create(data):
        result = user_collection.insert_one(data)
        return str(result.inserted_id)
    
    @staticmethod
    def find_all():
        users = list(user_collection.find())
        for user in users:
            user['_id'] = str(user['_id'])
        return users
    
    @staticmethod
    def find_by_id(user_id):
        user = user_collection.find_one({'_id': ObjectId(user_id)})
        if user:
            user['_id'] = str(user['_id'])
        return user
    
    @staticmethod
    def find_by_email(email):
        user = user_collection.find_one({'email': email})
        if user:
            user['_id'] = str(user['_id'])
        return user
    
    @staticmethod
    def update(user_id, data):
        result = user_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': data}
        )
        return result.modified_count
    
    @staticmethod
    def delete(user_id):
        result = user_collection.delete_one({'_id': ObjectId(user_id)})
        return result.deleted_count
