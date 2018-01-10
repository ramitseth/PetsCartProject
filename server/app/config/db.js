const MongoClient = require('mongodb').MongoClient;

// Mongo DB details
const mongoURL = "mongodb://localhost:27017";
const dbName = "shoppingcart";

module.exports = {
    MongoClient: MongoClient,
    mongoURL: mongoURL,
    dbName: dbName
};