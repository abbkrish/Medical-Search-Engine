var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var searchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    short_description: {
        type: String,
        required: false
    },
    symptoms: {
        type: [String],
        required: false
    },
    treatments: {
        type: [String],
        required: false
    },
    updated: {
        type: Date,
        require: false
    },
    conditions: {
        type: [String],
        required: false
    },
    sources: {
        type: [String],
        required: false
    }
});

searchSchema.methods.query = function(entities) {
    console.log("Queried: ");
    console.log(entities);
}

searchSchema.methods.get = function(entity) {
    console.log("Got:")
    console.log(entity);
};
 
searchSchema.methods.put = function(entity) {
    console.log("Put:")
    console.log(entity);
};
 
searchSchema.methods.post = function(entity) {
    console.log("Posted:")
    console.log(entity);
};
 
searchSchema.methods.delete = function(entity) {
    console.log("Deleted:")
    console.log(entity);
};

exports.Search = mongoose.model('search', searchSchema);


