import React, {Component} from 'react';
import {Link} from 'react-router';
import LoginForm from './LoginForm';

export default class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      formState: 'sign-in'
    };
  }
  render() {
    return (
      <div className='loginpage-bg'>
        <LoginForm />
        <span className='loginpage-links'>
          <Link to={'/'}>Login</Link>
          <Link to={'signup'}>Create Account</Link>
        </span>
      </div>
    );
  }
}
