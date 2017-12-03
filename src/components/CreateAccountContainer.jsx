import React, {Component} from 'react';
import {Link} from 'react-router';
import CreateAccountForm from './CreateAccountForm';

export default class CreateAccountContainer extends Component {
  constructor() {
    super();
    this.state = {
      formState: 'sign-in'
    };
  }
  render() {
    return (
      <div className='loginpage-bg'>
        <CreateAccountForm />
        <span className='loginpage-links'>
          <Link to={'/'}>Login</Link>
          <Link to={'signup'}>Create Account</Link>
        </span>
      </div>
    );
  }
}
