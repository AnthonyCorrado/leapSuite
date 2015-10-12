var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Contact = require('./models/Contact.js').model;
var db = require('./config').db;

// var jwt = require('./services/jwt.js');
var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.use(express.static(__dirname + '../app')); 

mongoose.connect(db[process.env.NODE_ENV || 'development']);

require('./routes/routes')(app);

var server = app.listen(3000, function() {
  console.log('server listening on ', server.address().port);
});