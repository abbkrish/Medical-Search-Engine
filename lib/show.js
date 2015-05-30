var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var showSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 1950,
        max: 2030,
        required: true
    },
    IMDB: {
        type: Number,
        min: 0,
        max: 10,
        required: false
    }
});

showSchema.methods.query = function(entities) {
    console.log("Queried: ");
    console.log(entities);
}

showSchema.methods.get = function(entity) {
    console.log("Got:")
    console.log(entity);
};
 
showSchema.methods.put = function(entity) {
    console.log("Put:")
    console.log(entity);
};
 
showSchema.methods.post = function(entity) {
    console.log("Posted:")
    console.log(entity);
};
 
showSchema.methods.delete = function(entity) {
    console.log("Deleted:")
    console.log(entity);
};

exports.Show = mongoose.model('show', showSchema);

