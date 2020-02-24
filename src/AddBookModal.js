import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import BookForm from "./forms/BookForm";
import Modal from "react-responsive-modal";
import authStore from "./stores/authStore";

class AddBookModal extends Component {
  state = {
    open: false
  };

  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  render() {
    if (!authStore.user) return <Redirect to="/signup"></Redirect>;
    const { open } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <BookForm author={this.props.author} closeModal={this.onCloseModal} />
        </Modal>
        <input type="button" onClick={this.onOpenModal} value="Add New Book!" />
      </div>
    );
  }
}
export default AddBookModal;
