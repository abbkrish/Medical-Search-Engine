echo 'Installing curl'
sudo apt-get install -y curl

echo 'Installing pip'
sudo apt-get install -y python-pip
sudo pip install Naked
sudo pip install BeautifulSoup
sudo pip install mechanize
sudo pip install https://github.com/mongodb/mongo-python-driver/archive/3.0b0.tar.gz

echo 'Installing git'
sudo apt-get install -y git

echo 'Get right version of nodejs, npm'
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs

sudo apt-get install -y npm

echo 'Setting registry'
npm config set registry http://registry.npmjs.org/

echo 'Installing express'
npm install -g express

echo 'Installing zombies'
sudo apt-get install -y make
sudo apt-get install -y g++
npm install -g zombie

echo 'Installing grunt'
npm install -g grunt-cli

echo 'Installing bootstrap'
npm install -g bootstrap

echo 'Installing nightwatch'
npm install -g nightwatch

echo 'Installing mongoose'
npm install -g mongoose

echo 'Installing mongoDB'
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y mongodb-org

echo 'Installing socket.io'
npm install -g socket.io

echo 'Installing ejs'
npm install -g ejs

echo 'Installing body-parser'
npm install -g body-parser

echo 'Installing sprig'
npm install -g sprig

echo 'Installing passport'
npm install -g passport

echo 'Installing google strategy'
npm install -g passport-google-oauth2

echo 'Installing oauth'
npm install -g oauth

echo 'Installing passport-strategy'
npm install -g passport-strategy

echo 'Installing harp'
npm install -g harp

echo 'Installing q'
npm install -g q

echo 'Installing paramiko'
sudo pip install paramiko

echo 'Installing fabric'
sudo apt-get install -y fabric
