var users = require('../controllers/users');
var texts = require('../controllers/texts');

module.exports = function(app) {

  app.get('/users', users.index);
  app.post('/sendText', texts.create);
};