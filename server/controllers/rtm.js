var rtmProvider = require('../providers/slack');

exports.create = function (req, res, next) {
  console.log(req.body);
  var to = req.body.to;
  var payload = req.body.payload;
  rtmProvider.sendRTM(to, payload);
}