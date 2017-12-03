import React, {Component} from 'react';
import ChatActions from '../actions/ChatActions';
import ChatStore from '../stores/ChatStore';

export default class ChatFriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsList: [],
      friendsListStatus: '',
      initialRoomOpen: false
    };

    this.onFriendsListClick = this.onFriendsListClick.bind(this);
  }
  componentDidMount() {
    this.unsubscribe = ChatStore.listen(function(storeState) {
      this.setState({
        friendsListStatus: storeState.status,
        friendsList: storeState.userList
      });
    }.bind(this));
  }
  componentDidUpdate() {
    if (!this.state.initialRoomOpen && this.state.friendsListStatus == '200') {
      ChatActions.openChatRoom(this.props.currentUser, this.state.friendsList[0]);
      this.setState({
        initialRoomOpen: true
      });
    }
  }
  componentWillMount() {
    ChatActions.getAllFriends(this.props.currentUser.username);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onFriendsListClick(i) {
    ChatActions.openChatRoom(this.props.currentUser, this.state.friendsList[i]);
  }
  render() {
    var friendsTable = this.state.friendsList.map((friend, index) => {
      return (
        <tr className='friend-name-row' key={index} onClick={() => this.onFriendsListClick(index)}>
          <td className='friends-list-cell'>{friend.firstname} {friend.lastname}</td>
        </tr>
      );
    });

    return (
      <table className='friends-list-container'>
        <tbody>
          <tr className='friend-list-header'>
            <th>Friends</th>
          </tr>
          {friendsTable}
        </tbody>
      </table>
    );
  }
}
