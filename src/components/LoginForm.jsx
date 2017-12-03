import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {username: '', password: '', status: '', _id: '', user: {}};
    this.feedback = '';

    this.onUsernameChangeHandler = this.onUsernameChangeHandler.bind(this);
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }
  componentDidMount() {
    this.unsubscribe = UserStore.listen(function(userState) {
      this.setState({status: userState.status, _id: userState._id, user: userState.user});

      if (this.state.status == '200') {
        var userInfo = this.state.user;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        hashHistory.push('messages/' + this.state._id);
      } else {
        this.feedback = 'Invalid username and password combination.';
        this.setState({
          username: '',
          password: ''
        });
      }
    }.bind(this));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onUsernameChangeHandler(e) {
    this.setState({
      username: e.target.value
    });
  }
  onPasswordChangeHandler(e) {
    this.setState({
      password: e.target.value
    });
  }
  onLogin(e) {
    e.preventDefault();
    UserActions.login(this.state.username, this.state.password);
  }
  render() {
    var disabled = <button className='btn btn-primary btn-sm' type='submit' disabled>Login</button>;
    var enabled = <button className='btn btn-primary btn-sm' type='submit'>Login</button>;
    var display = disabled;

    if (this.state.username && this.state.password) {
      display = enabled;
    }

    return (
      <div className='login-form'>
        <h1>Welcome to KatChat!</h1>
        <br/>
        <form className='form-inline' onSubmit={this.onLogin}>
          <div className='form-group'>
            <input
              type='text' className='form-control' placeholder='username'
              value={this.state.username} onChange={this.onUsernameChangeHandler}
            />
          </div>
          <div className='form-group'>
            <input
              type='password' className='form-control' placeholder='password'
              value={this.state.password} onChange={this.onPasswordChangeHandler}
            />
          </div>
          <br/>
          <span className='login-createAccount-submit'>
            {display}
            {this.feedback}
          </span>
        </form>
      </div>
    );
  }
}
