const express = require('express');
const config = require('../config/config.js');
const database = require('../config/db.js');

var router = express.Router();
const collectionName = "Users";

// This responds to login requests
router.post('/', function (req, res) {
    
    var returnData = config.returnData;
    if (!req.body.username || !req.body.password) {
        returnData.result = "Username or password empty";
        res.end(JSON.stringify(returnData));
    } else {
        var userData = {
            username: req.body.username,
            password: req.body.password,
        };

        database.MongoClient.connect(database.mongoURL, function (err, db) {
            if (err) {
                console.log(err.message);
                res.end(JSON.stringify(returnData));
            } else {
                var localDB = db.db(database.dbName);
                localDB.collection(collectionName).findOne(userData, function (err, result) {
                    db.close();
                    if (err) {
                        console.log(err.message);
                        res.end(JSON.stringify(returnData));
                    } else {
                        // If we do not find the user, throw error
                        if (!result) {
                            returnData.result = "Username or password incorrect";
                            res.end(JSON.stringify(returnData));
                        } else {
                            returnData = {
                                status: true,
                                result: result
                            };
                            res.end(JSON.stringify(returnData));
                        }
                    }
                });
            }
        });
    }
});

// Export this router to use in app.js
module.exports = router;