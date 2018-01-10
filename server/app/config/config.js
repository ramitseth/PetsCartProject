const express = require('express');
const bodyParser = require('body-parser');
var app = express();

// To Parse json data and URL encoded data from body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

module.exports = {
    app: app,
    returnData: {
        status: false,
        result: "Error"
    }
};