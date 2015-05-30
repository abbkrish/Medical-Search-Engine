//var db = require('../lib/show.js');
var db2 = require('../lib/search.js');

exports.list = function(req, res) {
    console.log('performing list');    
    var filter = (req.params.title == null)?{}:{title: req.params.title};
    db.Show.find(filter).find(function(err, todo) {
        if(err) res.send(err);
        res.json(todo);
        console.log('cookies');
    });
    
};

exports.add = function(req, res) {
    console.log('performing add');

    var show1 = new db.Show({
        title: req.body.title,
        year: req.body.year
    });

    show1.save(function (err) {
        if(err) {console.log(err.stack);}
        console.log('saving done');
    });

    res.json({
        title: req.body.title,
        year: req.body.year
    });
};

exports.update = function(req, res) {
    console.log('performing update');
    res.json({
            'name': 'yolo'
    });
};

exports.delete = function(req, res) {
    console.log('performing delete');
    res.json({
        'name': 'yolo'
    });
};

exports.listSearch = function(req, res) {
    console.log('performing list (search)');
    var filter = {};
    if(req.params.name != null) {
        filter.name = req.params.name;
    }
    if(req.params.conditions != null) {
        /* filtering on conditions */
    }
    if(req.params.symptoms != null) {
        /* filtering on symptoms */
    }

    db2.Search.find(filter).find(function(err, todo) {
        if(err) res.send(err);
        res.json(todo);
    });
    console.log('find done (search)');
};

exports.addSearch = function(req, res) {
    console.log('performing add (search)');
    console.log(req.body);

    data = {
        name: req.body.name
    };

    if(req.body.symptoms != null) {
        data[symptoms] = req.body.symptoms;     
    }

    if(req.body.treatments != null) {
        data[treatments] = req.body.treatments;
    }

    if(req.body.conditions != null) {
        data[conditions] = req.body.conditions;
    }

    data.updated = Date.now(); 

    var search1 = new db2.Search(data);

    search1.save(function (err) {
        if(err) {console.log(err.stack);}
        console.log('saving done (search)');
    });

    res.json(data);
};

