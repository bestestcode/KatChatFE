import React, {Component} from 'react';
import {
  Modal,
  ModalHeader,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

export default class ChatWelcomeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.hideModal = this.hideModal.bind(this);
  }
  hideModal() {
    this.setState({
      isOpen: false
    });
  }
  render() {
    return (
      <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
        <ModalHeader>
          <ModalClose onClick={this.hideModal}/>
        </ModalHeader>
        <ModalBody>
          <h2>Welcome to KatChat {this.props.currentUser.firstname}!</h2>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-default' onClick={this.hideModal}>
            Close
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}
