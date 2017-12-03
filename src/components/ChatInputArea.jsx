import React, {Component} from 'react';
import ChatActions from '../actions/ChatActions';

export default class ChatInputArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  onChangeHandler(e) {
    this.setState({
      message: e.target.value
    });
  }
  sendMessage(e) {
    e.preventDefault();
    ChatActions.sendMessage(this.state.message, this.props.currentUser.firstname);
    this.setState({
      message: ''
    });
  }
  render() {
    return (
      <form className='message-sender-container' onSubmit={this.sendMessage}>
        <input
          id='message-input' value={this.state.message} type='text' onChange={this.onChangeHandler} autoFocus={false}
        />
        <button id='message-send' type='submit' className='btn btn-primary btn-sm'>Send</button>
      </form>
    );
  }
}
