# In-memory database fallback (no MongoDB required)
users_db = []
ngos_db = []

def get_fallback_db():
    """Returns a mock database object for fallback"""
    class FallbackDB:
        def __getitem__(self, key):
            if key == 'users':
                return FallbackCollection(users_db)
            elif key == 'ngos':
                return FallbackCollection(ngos_db)
            return FallbackCollection([])
    
    return FallbackDB()

class FallbackCollection:
    def __init__(self, data):
        self.data = data
    
    def insert_one(self, doc):
        doc['_id'] = str(len(self.data) + 1)
        self.data.append(doc)
        class Result:
            def __init__(self, id):
                self.inserted_id = id
        return Result(doc['_id'])
    
    def find_one(self, query):
        for item in self.data:
            if all(item.get(k) == v for k, v in query.items()):
                return item
        return None
    
    def find(self, query=None):
        if query is None:
            return self.data
        return [item for item in self.data if all(item.get(k) == v for k, v in query.items())]
    
    def update_one(self, query, update):
        for item in self.data:
            if all(item.get(k) == v for k, v in query.items()):
                item.update(update.get('$set', {}))
                class Result:
                    modified_count = 1
                return Result()
        class Result:
            modified_count = 0
        return Result()
    
    def delete_one(self, query):
        for i, item in enumerate(self.data):
            if all(item.get(k) == v for k, v in query.items()):
                self.data.pop(i)
                class Result:
                    deleted_count = 1
                return Result()
        class Result:
            deleted_count = 0
        return Result()

def get_users():
    return users_db

def get_ngos():
    return ngos_db

def add_user(user):
    user['_id'] = str(len(users_db) + 1)
    users_db.append(user)
    return user['_id']

def find_user_by_email(email):
    return next((u for u in users_db if u.get('email') == email), None)

def add_ngo(ngo):
    ngo['_id'] = str(len(ngos_db) + 1)
    ngos_db.append(ngo)
    return ngo['_id']

def find_ngo_by_email(email):
    return next((n for n in ngos_db if n.get('email') == email), None)
