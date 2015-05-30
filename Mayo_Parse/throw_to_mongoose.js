var fs = require('fs');
var mongoose = require('mongoose');
var exp = require('../lib/search.js');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
var obj;
fs.readFile('./dump_json.txt', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  db.once('open', function(callback) {
      for (var i = 0; i < 20; i++) {
          //console.log('trying');
          console.log(i);
          var tmpSearch = new exp.Search({
                name: obj[i].name,
                description: obj[i].description,
                symptoms: obj[i].symptoms,
                treatments: obj[i].treatment,
                sources: obj[i].source,
                causes: obj[i].causes,
                updated: Date.now()
          });
          tmpSearch.save(function (err) {
              if(err) {console.log(err.stack);}
              console.log('save done');
          });
      }
  });
});
