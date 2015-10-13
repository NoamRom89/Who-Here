var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Users schema  - document
var userSchema = new schema({
	FirstName: String,
	LastName: String,
	Picture:String
}, { collection: 'users' });

//Exports
exports.userSchema = userSchema;
