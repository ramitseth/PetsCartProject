const express = require('express');
const config = require('../config/config.js');
const database = require('../config/db.js');

var router = express.Router();
const collectionName = "Users";
var returnData = config.returnData;

// This responds to the request of updation of pets for a user
router.post('/update', function (req, res, next) {

    var username = req.body.username;
    var petID = req.body.petID;
    var quantity = req.body.quantity;

    // Username or pet id or quantity to enter should not be empty or null
    if (!username || !petID || !quantity) {
        next();
    } else {
        database.MongoClient.connect(database.mongoURL, function (err, db) {
            if (err) {
                console.log(err.message);
                next();
            } else {
                var localDB = db.db(database.dbName);
                var searchQuery = {
                    username: username,
                    'petslist.petID': petID
                };
                var updateQuery = {
                    $set: {
                        'petslist.$.quantity': quantity
                    }
                };

                // We only need to change the quantity, if the pet is already present in user's petslist
                localDB.collection(collectionName).updateOne(searchQuery, updateQuery, function (err, result) {
                    if (err) {
                        db.close();
                        console.log(err.message);
                        next();
                    } else {
                        console.log("update result " + result);
                        result = JSON.parse(result);

                        // If the pet is not present in user's petslist, append the pet to the petslist
                        if (result.nModified == 0) {
                            searchQuery = {
                                username: username
                            };
                            updateQuery = {
                                $push: {
                                    petslist: {
                                        petID: petID,
                                        quantity: quantity
                                    }
                                }
                            };
                            localDB.collection(collectionName).updateOne(searchQuery, updateQuery, function (err, result) {
                                db.close();
                                if (err) {
                                    console.log(err.message);
                                    next();
                                } else {
                                    console.log("update result " + result);
                                    returnData = {
                                        status: true,
                                        result: result
                                    };
                                    next();
                                }
                            });
                        } else {
                            db.close();
                            returnData = {
                                status: true,
                                result: result
                            };
                            next();
                        }
                    }
                });
            }
        });
    }
}, function (req, res) {
    
    // First chek if previous function gave success or failure
    if (!returnData.status) {
        res.end(JSON.stringify(returnData));
    } else {
        var searchQuery = {
            username: req.body.username
        };

        // Search for the user and his pet's list
        database.MongoClient.connect(database.mongoURL, function (err, db) {
            if (err) {
                console.log(err.message);
                res.end(JSON.stringify(returnData));
            } else {
                var localDB = db.db(database.dbName);
                localDB.collection(collectionName).findOne(searchQuery, function (err, result) {
                    db.close();
                    if (err) {
                        console.log(err.message);
                        res.end(JSON.stringify(returnData));
                    } else {
                        returnData = {
                            status: true,
                            result: result
                        };
                        res.end(JSON.stringify(returnData));
                    }
                });
            }
        });
    }
});

// Export this router to use in app.js
module.exports = router;