var Reflux = require('reflux');

var UserActions = Reflux.createActions([
  'createUser',
  'login'
]);

module.exports = UserActions;
