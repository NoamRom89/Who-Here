// mongoose Connection
var mongoose = require('mongoose');
// Require user schema JS file
var userSchema = require('./db.userSchema').userSchema;
// User Model
var User = mongoose.model('UserM', userSchema);

var getUsers = function (callback) {
    
        // Connect if not connected already
        if (!mongoose.connection.readyState) {
        mongoose.connect("mongodb://noamr:bellalin23@ds027744.mongolab.com:27744/bulletin");
        }
        
        var conn = mongoose.connection;
        
        var query = User.find();
        query.exec(function (err, users) {
            if (err) {
                console.log('err', err);
            } else {
                console.log('getUser()', users);
                callback(users);
            }
        });
    };
    
    // Exports
    exports.getUsers = getUsers;
