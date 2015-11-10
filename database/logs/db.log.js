// mongoose Connection
var mongoose = require('mongoose');
// Require user schema JS file
var logSchema = require('./db.logSchema').logSchema;
// Require user schema JS file
var userSchema = require('../users/db.userSchema').userSchema;
// User Model
var User = mongoose.model('users', userSchema);
// Logs Model
var Log = mongoose.model('LogM', logSchema);

var addLog = function (log) {

    console.log('log!!!!!!!!!!!!!!!!', log);
        var obj = Log(log);
        obj.save(function (err, logObj) {
            if (err) {
                console.log('Error! : ', err);
                return;
            }
            console.log('logObject was saved!', logObj);
        });
    //}
}

var getLog = function (callback) {
    // Connect if not connected already
    if (!mongoose.connection.readyState) {
        mongoose.connect("mongodb://noamr:bellalin23@ds027744.mongolab.com:27744/bulletin");
    }

    var conn = mongoose.connection;

    var query = Log.find();
    query.exec(function (err, logs) {
        if (err) {
            console.log('err', err);
        } else {
            console.log('getUser()', logs);
            callback(logs);
        }
    });
    
}

var getPopulateLog = function (callback) {

    var query = Log.find().populate('userId').exec(function (err, logs) {
        if (err) {
            console.log('err', err);
        } else {
            callback(logs);
        }
    });

}

//Exports
exports.addLog = addLog;
exports.getLog = getLog;
exports.getPopulateLog = getPopulateLog;