var SlackClient = require('slack-api-client');
var apiKey = require('../config').slack.TOKEN;

var slack = new SlackClient(apiKey);

exports.sendRTM = function(to, body) {
  slack.api.chat.postMessage({
    channel: to,
    as_user: 'true',
    text: body
  }, function(err, res) {
    if (err) {
      throw err;
    }
    console.log(res);
  })
}