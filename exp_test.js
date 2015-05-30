var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/test');
//var harp = require('harp');
var api = require('./routes/api');
var bodyParser = require('body-parser')
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID:     '106357022026.apps.googleusercontent.com',
    clientSecret: 'pdBCI-EMvBhGtbneHHsXW2JW',
    callbackURL: "http://127.0.0.1:4568/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

var app = module.exports = express();
//app.use(harp.mount(__dirname + "/public"));
//app.use(harp.mount(__dirname + "/React_tut"));
//app.use(harp.mount(__dirname + '/templates'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.engine('js', require('ejs').renderFile);
app.set('view engine', 'ejs');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(){ /* … */ });
server.listen(3000);

/* HTML */
app.get('/loop/', function(req, res){
    res.render('loop.html');
});
app.get('/angular_t1/', function(req, res) {
    res.render('angular_t1.html');
});
app.get('/home/', function(req, res) {
    res.render('home.html');
});

/* Angular */
app.get('/app2.js/', function(req, res) {
    res.render('app2.js');
});

/* Templates */
app.get('/add_order.html/', function(req, res) {
    res.render('templates/add_order.html');
});
app.get('/show_search.html/', function(req, res) {
    res.render('templates/show_order.html');
});
app.get('/search_display.html/', function(req, res) {
    res.render('templates/search_display.html');
});
app.get('/recent_display.html/', function(req, res) {
    res.render('templates/recent_display.html');
});
app.get('/nearby_healthcare.html/', function(req, res) {
    res.render('templates/nearby_healthcare.html');
});


//to load files from the public folder 
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/img'));


/* API */
app.get('/api/post/:title?', function(req, res) {
    console.log(req.body);
    console.log(req.params);
    api.list
});
app.post('/api/postAdd', function(req, res) {
    console.log(req.body);
    api.add(req, res);
});
app.put('/api/post/:id', api.update);
app.delete('/api/post/:id', api.delete);

app.get('/api/searchList/:name?', function(req, res) {
    console.log(req.params);
    api.listSearch(req, res);
});
app.post('/api/searchAdd', function(req, res) {
    console.log(req.body);
    api.addSearch(req, res);
});

/* Logins */
app.get('/auth/google',
  passport.authenticate('google', { scope: 
    [ 'https://www.googleapis.com/auth/plus.login',
    , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));
app.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/loop',
        failureRedirect: '/login'
}));
