var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Users schema  - document
var logSchema = new schema({
	dateCreated: {type: String, default: Date.now},
	status: { type: String, required:true },
	date: { type: String, required: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
}, { collection: 'logs' });

//Exports
exports.logSchema = logSchema;
