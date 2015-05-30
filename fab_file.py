from fabric.api import local

def poll_terms():
    local("python ./Mayo_Parse/poll_terms.py")

def parse_terms():
    local("python ./Mayo_Parse/test_parse.py")

def clean_up_database():
    local("python ./Mayo_Parse/clean_up_mongo.py")

def add_to_database():
    local("python ./Mayo_Parse/throw_to_mongo.py")

def stash_terms():
    local("python ./Mayo_Parse/stash_terms.py")

def startServer():
    local("node ./exp_test.js")

def prepare_deploy():
    clean_up_database()
    add_to_database()
    stash_terms()
    startServer()


if __name__ == "__main__":
    prepare_deploy()
