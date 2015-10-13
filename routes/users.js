var express = require('express');
var router = express.Router();
var usersDB = require("../database/users/db.user");

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

/* POST board page. */
router.post('/api/getUsers', function (req, res) {
    console.log('/api/getUsers');
    usersDB.getUsers(function (users) {
        res.json(users);
    });

});

module.exports = router;