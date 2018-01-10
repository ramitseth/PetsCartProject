const express = require('express');
const config = require('../config/config.js');
const database = require('../config/db.js');

var router = express.Router();
const collectionName = "Users";

// This responds to registration requests
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

        if (req.body.mobile) {
            userData.mobile = req.body.mobile
        }

        if (req.body.email) {
            userData.email = req.body.email
        }

        database.MongoClient.connect(database.mongoURL, function (err, db) {
            if (err) {
                console.log(err.message);
                res.end(JSON.stringify(returnData));
            } else {
                var localDB = db.db(database.dbName);
                var searchQuery = {
                    username: userData.username
                };

                // First we will check if the user already exists or not
                localDB.collection(collectionName).findOne(searchQuery, function (err, result) {
                    if (err) {
                        db.close();
                        console.log(err.message);
                        res.end(JSON.stringify(returnData));
                    } else {

                        // If we do not find the user, we will add the user
                        if (!result) {
                            localDB.collection(collectionName).insertOne(userData, function (err, result) {
                                db.close();
                                if (err) {
                                    console.log(err.message);
                                    res.end(JSON.stringify(returnData));
                                } else {
                                    console.log("New user added- " + userData.username);
                                    returnData = {
                                        status: true,
                                        result: "User registered successfully"
                                    };
                                    res.end(JSON.stringify(returnData));
                                }
                            });
                        } else {
                            db.close();
                            returnData.result = "User already exists. Please select a different username";
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