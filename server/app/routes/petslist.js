const express = require('express');
const config = require('../config/config.js');
const database = require('../config/db.js');

var router = express.Router();
const collectionName = "Pets";

// This responds to the request for pets selection page
router.get('/', function (req, res) {

    var returnData = config.returnData;
    database.MongoClient.connect(database.mongoURL, function (err, db) {
        if (err) {
            console.log(err.message);
            res.end(JSON.stringify(returnData));
        } else {
            var localDB = db.db(database.dbName);

            localDB.collection(collectionName).find().toArray(function (err, result) {
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
});

// Export this router to use in app.js
module.exports = router;