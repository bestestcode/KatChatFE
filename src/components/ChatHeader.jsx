import React, {Component} from 'react';
import {Popover, ButtonToolbar, OverlayTrigger} from 'react-bootstrap';
import ChatActions from '../actions/ChatActions';

export default class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAccountPopover: false
    };

    this.accountIconClickHandler = this.accountIconClickHandler.bind(this);
  }
  accountIconClickHandler() {
    this.setState({
      showAccountPopover: !this.state.showAccountPopover
    });
  }
  signOutClickHandler() {
    ChatActions.signOut();
  }
  render() {
    const accountPopOver = (
      <Popover id='popover-trigger-click' className='account-popover'>
        <h3>Account</h3>
        <button className='btn btn-primary btn-sm'>Edit Profile</button>
        <a onClick={this.signOutClickHandler} href='/'>
          <button className='btn btn-primary btn-sm'>Sign Out</button>
        </a>
      </Popover>
    );

    return (
      <div className='chat-header-area'>
        <div className='chat-header-left'>
          <h1>KatChat Messenger</h1>
        </div>
        <div className='chat-header-right'>
          <ButtonToolbar>
            <span>
              <OverlayTrigger
                show={this.state.showAccountPopover} trigger='click' placement='bottom' overlay={accountPopOver}
              >
                <img onClick={this.accountIconClickHandler} src='/src/assets/imgs/account.png' height='40' width='40' />
              </OverlayTrigger>
            </span>
            <span><img src='/src/assets/imgs/settings.png' height='40' width='40' /></span>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}
