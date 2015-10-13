﻿// mongoose Connection
var mongoose = require('mongoose');
// Require user schema JS file
var logSchema = require('./db.logSchema').logSchema;
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

//Exports
exports.addLog = addLog;
exports.getLog = getLog;