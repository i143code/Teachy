// Define dependencies

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Set up DB

require('./config/mongoose.js');

// Set up express, set up 

var app = express()

app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.json());

// Set up routes

require('./config/routes')(app)

// Set up server

var server = app.listen(8000, function(){
	console.log('NodeJS/Express/Sockets/Teachy :8000');
})

// Set up Socket.IO

require('./config/socketio')(server);