var contacts = require('../controllers/contacts');
var texts = require('../controllers/texts');

module.exports = function(app) {

  app.get('/contacts', contacts.index);
  app.post('/sendText', texts.create);
};