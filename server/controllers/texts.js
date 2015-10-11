var smsProvider = require('../provider/twilio');

exports.create = function (req, res, next) {
  var toNumber = req.body.to;
  var payload = req.body.payload;
  console.log(res);
  smsProvider.sendSMS(toNumber, payload);
} 