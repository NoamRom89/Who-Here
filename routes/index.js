var express = require('express');
var router = express.Router();
var usersDB = require("../database/users/db.user");
var statusEnum = require("../enum/status");
var logDB = require('../database/logs/db.log');
var updatedData = require('../logic/updatedData');


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index.html');
});

router.get('/logs', function (req, res) {
        res.render('logs.html');
});


/* POST board page. */
router.post('/api/getupdatedData', function (req, res) {
    console.log('/api/getupdatedData from index.js', req.body);
    var date = req.body.date || '';
    if (date == '') {
        res.json({ err: 'error' });
        return;
    }
    updatedData.updatedData(req.body.date, function (result) {
        res.json(result);
    });

});

router.post('/api/getStatuseEnum', function (req, res) {
    console.log('/api/getStatuseEnum from index.js', req.body);
    res.json(statusEnum);

});

router.post('/api/addLog', function (req, res) {
    console.log('/api/addLog from index.js', req.body);
    //Checking if data was saved
    logDB.addLog(req.body.logToBeSent);
});



//Logs page
router.post('/api/getLog', function (req, res) {
    console.log('/api/getLog from index.js');
    logDB.getLog(function (log) {
        res.json(log);
    });

});

//Returen populate log obj
router.post('/api/getPopulateLog', function (req, res) {
    console.log('/api/getPopulateLog from index.js: ',req.body);
    logDB.getPopulateLog(function (log) {
        res.json(log);
    });

});


module.exports = router;