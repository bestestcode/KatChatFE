import React, {Component} from 'react';
import ChatStore from '../stores/ChatStore';

export default class ChatDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: ''
    };
  }
  componentDidMount() {
    ChatStore.listen(function(storeState) {
      this.setState({
        firstname: storeState.otherUser.firstname,
        lastname: storeState.otherUser.lastname,
        username: storeState.otherUser.username
      });
    }.bind(this));
  }
  render() {
    return (
      <div className='detail-container'>
        <h1>{this.props.currentUser.firstname} {this.props.currentUser.lastname}</h1>
        <h3>({this.props.currentUser.username})</h3>
        <h4>
          Chatting With
        </h4>
        <h2>{this.state.firstname} {this.state.lastname}</h2>
        <h3>({this.state.username})</h3>
      </div>
    );
  }
}
