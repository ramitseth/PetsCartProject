const http = require('http');
const database = require('./app/config/db.js');
const routes = require('./app/app.js');


// Express server details 
const hostname = '127.0.0.1';
const port = 3000;


// Check mongoDB connection and default data while the server starts up
var collectionName = 'Pets';
var nameList = ["Cat", "Bird", "Fish", "Dog"];
var dataList = [{
    petID: "1000",
    name: "Cat",
    cost: 40
}, {
    petID: "1001",
    name: "Bird",
    cost: 100
}, {
    petID: "1002",
    name: "Fish",
    cost: 90
}, {
    petID: "1003",
    name: "Dog",
    cost: 50
}];

database.MongoClient.connect(database.mongoURL, function (err, db) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Mongo DB connection established");
        var localDB = db.db(database.dbName);
        var searchQuery = {
            name: {
                $in: nameList
            }
        };

        localDB.collection(collectionName).findOne(searchQuery, function (err, result) {
            if (err) {
                console.log(err.message);
                db.close();
            } else {

                // If we do not find the collection or data in it, we will insert the data
                if (!result) {
                    localDB.collection(collectionName).insertMany(dataList, function (err, result) {
                        db.close();
                        if (err) {
                            console.log(err.message);
                        } else {
                            console.log(result.result.n + " rows inserted in " + collectionName);
                        }
                    });
                } else {
                    db.close();
                }
            }
        });
    }
});


// Start the local express server
var server = routes.app.listen(port, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});