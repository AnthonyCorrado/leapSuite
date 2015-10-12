var smsProvider = require('../providers/twilio');

exports.create = function (req, res, next) {
  var toNumber = req.body.to;
  var payload = req.body.payload;
  smsProvider.sendSMS(toNumber, payload);
} 