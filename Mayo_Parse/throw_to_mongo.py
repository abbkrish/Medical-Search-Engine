from pymongo import MongoClient
import json
import os

client = MongoClient('mongodb://localhost:27017/')
db = client['test']
collection = db.searches

curr_dir = os.path.dirname(os.path.realpath(__file__))

filo = open(curr_dir + '/dump_json.txt')
contents = json.load(filo)
for i in contents:
    post_id = db.searches.insert_one(i)
filo.close()
