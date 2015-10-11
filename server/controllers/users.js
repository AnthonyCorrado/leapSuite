var User = require('../models/User').model;

exports.index = function (req, res, next) {
  User.find({}, function(err, docs) {
    if(err) {
      res.send({error:err});
    }
    else {
      res.send({users:docs});
    } 
  })
}