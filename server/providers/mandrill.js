var mandrill = require('mandrill-api/mandrill');
var apiKey = require('../config').mail_client_test;
var mandrill_client = new mandrill.Mandrill(apiKey);

exports.sendEmail = function(to, from, content) {

  var fromEmail = from.email,
    fromName = from.name,
    toEmail = to.email,
    toName = to.name,
    replyTo = from.email;

  var message = {
    "text": content.payload,
    "subject": content.subject,
    "from_email": fromEmail,
    "from_name": fromName,
    "to": [{
      "email": toEmail,
      "name": toName,
      "type": "to"
    }],
    "headers": {
      "Reply-To": replyTo
    }
  };

  var async = false;
  mandrill_client.messages.send(
    {
      "message": message,
      "async": async
    },
    function(result) {
      console.log(result);
      // res.json(result);
    }, function(e) {
      console.log('A mandrill error occured: ' + e.name + ' - ' + e.message);
  });
}
