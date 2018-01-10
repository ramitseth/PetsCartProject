const config = require('./config/config.js');
const petslist = require('./routes/petslist.js');
const userpets = require('./routes/userpets.js');
const login = require('./routes/login.js');
const registration = require('./routes/registration.js');


// Creating routes for users and pets
config.app.use('/petslist', petslist);
config.app.use('/userpets', userpets);
config.app.use('/login', login);
config.app.use('/registration', registration);


// This responds to default requests when no path/route is provided
config.app.all('/', function (req, res) {
    res.end("Shopping Cart server is running");
});


// Export these settings to use in index.js
module.exports = config;