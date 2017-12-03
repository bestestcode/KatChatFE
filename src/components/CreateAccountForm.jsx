import React, {Component} from 'react';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

export default class CreateAccountForm extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      status: ''
    };

    this.createAccount = this.createAccount.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.onUsernameChangeHandler = this.onUsernameChangeHandler.bind(this);
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
    this.onFirstnameChangeHandler = this.onFirstnameChangeHandler.bind(this);
    this.onLastnameChangeHandler = this.onLastnameChangeHandler.bind(this);
  }
  componentDidMount() {
    this.unsubscribe = UserStore.listen(function(userState) {
      this.setState({status: userState.status});

      this.setState({
        firstname: '',
        lastname: '',
        username: '',
        password: ''
      });
    }.bind(this));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  createAccount(e) {
    e.preventDefault();
    UserActions.createUser(this.state.firstname, this.state.lastname, this.state.username, this.state.password);
  }
  clearForm() {
    this.setState({
      firstname: '',
      lastname: '',
      username: '',
      password: ''
    });
  }
  onFirstnameChangeHandler(e) {
    this.setState({
      firstname: e.target.value
    });
  }
  onLastnameChangeHandler(e) {
    this.setState({
      lastname: e.target.value
    });
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
  render() {
    var disabled = <button type='submit' className='btn btn-primary btn-sm' disabled>Sign Up</button>;
    var enabled = <button type='submit' className='btn btn-primary btn-sm'>Sign Up</button>;
    var display = disabled;

    if (this.state.username && this.state.password && this.state.firstname && this.state.lastname) {
      display = enabled;
    }

    var submissionFeedback;

    if (this.state.status == '201') {
      submissionFeedback = 'Account successfully created!';
    } else if (this.state.status == '503') {
      submissionFeedback = 'Server is down...';
    } else if (this.state.status == '400') {
      submissionFeedback = 'Username already exists.';
    }

    return (
      <div>
        <h1>Create Account</h1>
        <br/>
        <form onSubmit={this.createAccount}>
          <div className='form-group'>
            <input
              type='text' className='form-control' placeholder='firstname'
              value={this.state.firstname} onChange={this.onFirstnameChangeHandler}
            />
          </div>
          <div className='form-group'>
            <input
              type='text' className='form-control' placeholder='lastname'
              value={this.state.lastname} onChange={this.onLastnameChangeHandler}
            />
          </div>
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
            <button type='reset' className='btn btn-primary btn-sm' onClick={this.clearForm}>Clear</button>
            {display}
            {submissionFeedback}
          </span>
        </form>
      </div>
    );
  }
}
