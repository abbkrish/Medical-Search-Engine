var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(callback) {
    /*
    var kittySchema = mongoose.Schema({
            name: String
    });

    kittySchema.methods.speak = function () {
        var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";

        console.log(greeting);
    }
 
    var Kitten = mongoose.model('Kitten', kittySchema);
    var silence = new Kitten({name: 'Silence'});
    console.log(silence.name);

    var fluffy = new Kitten({name: 'fluffy' });
    fluffy.speak();

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
        console.log('what you looking at');
    });

    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
    });

    Kitten.find({ name: /^Fluff/ }, callback);   

    //var Kitten = mongoose.model('Kitten', kittySchema);
    */

    /*
    var exp = require('./lib/show.js');
    var show1 = new exp.Show({
        title: 'The Hobbit',
        year: '2013'
    });

    show1.save(function (err) {
        if(err) {console.log(err.stack);}
        console.log('saving done');
    });

    */
    
    var exp = require('./lib/search.js');
    var search1 = new exp.Search({
        name: 'Diabetes',
        description: 'Diabetes is a problem with your body that causes blood glucose (sugar) levels to rise higher than normal. This is also called hyperglycemia. Type 2 diabetes is the most common form of diabetes. If you have type 2 diabetes your body does not use insulin properly. This is called insulin resistance. At first, your pancreas makes extra insulin to make up for it. But, over time it isn\'t able to keep up and can\'t make enough insulin to keep your blood glucose at normal levels. - See more at: http://www.diabetes.org/diabetes-basics/type-2/#sthash.HzsdPAR5.dpuf',
        symptoms: ['Increased Thirst', 'Frequent Urination', 'Weight Loss', 'Fatigue', 'Blurred vision'],
        conditions: ['genetic', 'not contagious'],
        treatments: ['Healthy eating', 'Regular exercise', 'Insulin therapy', 'Blood sugar monitoring'],
        sources: ['http://www.mayoclinic.org/diseases-conditions/type-2-diabetes/basics/treatment/con-20031902'],
        updated: Date.now()
    });

    search1.save(function (err) {
        if(err) {console.log(err.stack);}
        console.log('saving done');
    });
});

