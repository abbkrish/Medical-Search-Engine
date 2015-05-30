import json
import os

curr_dir = os.path.dirname(os.path.realpath(__file__))

json_data = open(curr_dir + '/dump_json.txt')
term_stash = open(curr_dir + '/../public/term_stash.txt', 'w')

data = json.load(json_data)
term_stash.write(json.dumps([{'name': piece['name']} for piece in data], indent=4))

term_stash.close()
json_data.close()
