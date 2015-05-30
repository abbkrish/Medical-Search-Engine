from pymongo import MongoClient
import json
import os

client = MongoClient('mongodb://localhost:27017/')
db = client['test']
db.searches.drop()
