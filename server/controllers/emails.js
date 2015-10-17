var emailProvider = require('../providers/mandrill');

exports.create = function (req, res, next) {
  var to = {
    "name": req.body.toName,
    "email": req.body.toEmail,
  };
  var from = {
    "name": req.body.fromName,
    "email": req.body.fromEmail,
  }
  var content = {
    "subject": req.body.subject,
    "payload": req.body.payload
  }
  emailProvider.sendEmail(to, from, content, function(err, data) {
    if (err) {
      return console.log('err in controller', err);
    }
    console.log('success in controller', data);
  });
}