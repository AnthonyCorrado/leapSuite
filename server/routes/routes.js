var contacts = require('../controllers/contacts');
var texts = require('../controllers/texts');
var emails = require('../controllers/emails');

module.exports = function(app) {

  app.get('/contacts', contacts.index);
  app.post('/sendText', texts.create);
  app.post('/sendEmail', emails.create);
};