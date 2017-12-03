var Reflux = require('reflux');

var ChatActions = Reflux.createActions([
  'sendMessage',
  'receiveMessages',
  'joinRoom',
  'getAllFriends',
  'openChatRoom',
  'createChatRoom',
  'signOut'
]);

module.exports = ChatActions;
