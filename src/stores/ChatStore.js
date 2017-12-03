var Reflux = require('reflux');
var UrlAssembler = require('url-assembler');
var $ = require('jQuery');
var _ = require('lodash');
var socket = require('socket.io-client')('http://localhost:4112');
var ChatActions = require('../actions/ChatActions');

var ChatStore = Reflux.createStore({
  listenables: ChatActions,
  state: {
    status: '',
    userList: [],
    otherUser: {},
    chatRoom: {},
    isRoomCreated: false,
    isRoomOpened: false
  },
  onGetAllFriends(currentUsername) {
    var url = UrlAssembler('http://localhost:9000')
      .template('/users/all')
      .toString();

    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function(data, status, xhr) {
        this.state.status = xhr.status;
        this.state.userList = data;
        _.remove(this.state.userList, function(user) {
          return user.username == currentUsername;
        });
        this.state.userList = _.sortBy(this.state.userList, ['firstname', 'lastname']);
        this.trigger(this.state);
      }.bind(this),
      error: function(xhr) {
        this.state.status = xhr;
        this.trigger(this.state);
      }.bind(this)
    });
  },
  onCreateChatRoom(user1, user2) {
    var url = UrlAssembler('http://localhost:9000')
      .template('/chatrooms')
      .toString();
    var users = {users: [user1, user2]};

    $.ajax({
      type: 'POST',
      url: url,
      dataType: 'json',
      data: users,
      success: function(data, status, xhr) {
        this.state.otherUser = user2;
        this.state.status = xhr.status;
        this.state.chatRoom = data;
        this.state.isRoomCreated = true;
        this.trigger(this.state);
        this.state.isRoomCreated = false;
      }.bind(this),
      error: function(xhr) {
        this.state.status = xhr.status;
        this.trigger(this.state);
      }.bind(this)
    });
  },
  onOpenChatRoom(user1, user2) {
    var url = UrlAssembler('http://localhost:9000')
      .template('/chatrooms')
      .query({
        username1: user1.username,
        username2: user2.username
      })
      .toString();

    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function(data, status, xhr) {
        this.state.status = xhr.status;
        if (this.state.chatRoom._id) {
          socket.emit('leave-room');
        }

        if (!data || data.length == 0) {
          ChatActions.createChatRoom(user1, user2);
        } else {
          this.state.otherUser = user2;
          this.state.chatRoom = data[0];
          this.state.isRoomOpened = true;
          this.trigger(this.state);
          this.state.isRoomOpened = false;
        }
      }.bind(this),
      error: function(xhr) {
        this.state.status = xhr.status;
      }.bind(this)
    });
  },
  onJoinRoom(roomId, firstname) {
    socket.emit('join-room', roomId, firstname);
  },
  onSendMessage(message, name) {
    socket.emit('message', message);
    if (!this.state.chatRoom.messages) {
      return;
    }
    this.state.chatRoom.messages.push({firstname: name, message: message});
    if (this.state.chatRoom.messages.length > 50) {
      this.state.chatRoom.messages.shift();
    }
    this.trigger(this.state);
  },
  onReceiveMessages() {
    socket.on('receive-message', function(msg, name) {
      this.state.chatRoom.messages.push({firstname: name, message: msg});
      if (this.state.chatRoom.messages.length > 50) {
        this.state.chatRoom.messages.shift();
      }
      this.trigger(this.state);
    }.bind(this));
  },
  onSignOut() {
    socket.emit('leave-room');
  }
});

module.exports = ChatStore;
