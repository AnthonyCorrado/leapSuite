var Contact = require('../models/Contact').model;
var MockContacts = require('../mock_data/contacts');

exports.index = function (req, res, next) {
  Contact.find({}, function(err, docs) {
    if(err) {
      res.send({error:err});
    }
    else {
      res.send({contacts:MockContacts});
    } 
  })
}