var mongoose = require('mongoose');
 
var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String
});

exports.model = mongoose.model('User', UserSchema);
