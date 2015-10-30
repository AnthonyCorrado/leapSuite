var mongoose = require('mongoose');
 
var ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    avatar: String,
    slackId: String
});

exports.model = mongoose.model('Contact', ContactSchema);
