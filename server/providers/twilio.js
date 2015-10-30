var twilio = require('twilio');
var sms = require('../config').sms;
 
exports.sendSMS = function(toNumber, body) {
    var client = new twilio.RestClient(sms.TWILIO_ACCOUNT_SID, sms.TWILIO_AUTH_TOKEN);
     
    client.sms.messages.create({
        to: toNumber || sms.TEST_TO_NUMBER,
        from: sms.TWILIO_NUMBER,
        body: body || 'Twilio Twest Message is empty!!!'
    }, function(error, message) {
        // The HTTP request to Twilio will run asynchronously. This callback
        // function will be called when a response is received from Twilio
        // The "error" variable will contain error information, if any.
        // If the request was successful, this value will be "falsy"
        if (!error) {
            // The second argument to the callback will contain the information
            // sent back by Twilio for the request. In this case, it is the
            // information about the text messsage you just sent:
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);
     
            console.log('Message sent on:');
            console.log(message.dateCreated);
        } else {
            console.log(error);
            console.log('Oops! There was an error.');
        }
    });
}
