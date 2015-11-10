// mongoose Connection
var mongoose = require('mongoose');
// Require user schema JS file
var userSchema = require('../database/users/db.userSchema').userSchema;
// Require logs schema JS file
var logSchema = require('../database/logs/db.logSchema').logSchema;
// User Model
var User = mongoose.model('UserM', userSchema);
//Log Modal
var Log = mongoose.model('LogM', logSchema);

function clone(a) {
    return JSON.parse(JSON.stringify(a));
}

var updatedData = function (date, callback){
    
    console.log('sent date', date);

    // Connect if not connected already
    if (!mongoose.connection.readyState) {
        mongoose.connect("mongodb://noamr:bellalin23@ds027744.mongolab.com:27744/bulletin");
    }
    
    var conn = mongoose.connection;
    
    //Getting all users
    var query = User.find();
    query.exec(function (err, users) {
        if (err) {
            console.log('err', err);
            return;
        }
        
        users = JSON.parse(JSON.stringify(users));

        var userDictionary = {};

        users.forEach(function (user) {
            user.log = {};
            userDictionary[user._id] = user;          
        });
        //Getting all logs
        var logQuery = Log.find({ 'date': date });
        logQuery.exec(function (err, logs) {
            if (err) {
                console.log('err', err);
                return;
            }

            logs = JSON.parse(JSON.stringify(logs));

            logs.forEach(function (log) {
                var user = userDictionary[log.userId];
                if (user) {
                    if (!(Object.keys(user.log).length === 0)) {
                        if (log.dateCreated > user.log.dateCreated)
                            userDictionary[log.userId].log = log;
                    } else {
                        console.log('log',log);
                        userDictionary[log.userId].log = log;
                    }
                } 
            });
            callback(Object.keys(userDictionary).map(function (k) { return userDictionary[k] }));
        });
    });
}


//Exports
exports.updatedData = updatedData;