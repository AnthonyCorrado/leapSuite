var Contact = require('../models/Contact').model;

exports.index = function (req, res, next) {
  Contact.find({}, function(err, docs) {
    if(err) {
      res.send({error:err});
    }
    else {
      res.send({contacts:docs});
    } 
  })
}