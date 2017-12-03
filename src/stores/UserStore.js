var Reflux = require('reflux');
var $ = require('jQuery');
var UserActions = require('../actions/UserActions');

var UserStore = Reflux.createStore({
  listenables: UserActions,
  state: {
    status: '',
    user: {},
    _id: ''
  },
  onCreateUser: function(firstname, lastname, username, password) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:9000/users/',
      data: {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password
      },
      dataType: 'json',
      success: function(data, status, xhr) {
        this.state.status = xhr.status;
        this.trigger(this.state);
      }.bind(this),
      error: function(xhr) {
        this.state.status = xhr.status;
        this.trigger(this.state);
      }.bind(this)
    });
  },
  onLogin: function(username, password) {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:9000/users?username=' + username + '&password=' + password,
      dataType: 'json',
      success: function(data, status, xhr) {
        this.state.status = xhr.status;
        this.state._id = data._id;
        this.state.user = data;
        this.trigger(this.state);
      }.bind(this),
      error: function(xhr) {
        this.state.status = xhr;
        this.trigger(this.state);
      }.bind(this)
    });
  }
});

module.exports = UserStore;
