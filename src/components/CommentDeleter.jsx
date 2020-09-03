import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class CommentDeleter extends Component {
  state = {
    isDeleting: false,
  };

  render() {
    return (
      <section>
        <label htmlFor="DelComment">Delete My Comment</label>
        <button id="DelComment" onClick={this.handleClick}>
          <FontAwesomeIcon color="red" size="1x" icon={faTimes} />
        </button>
        {this.state.isDeleting && <Loader />}
      </section>
    );
  }
  handleClick = (clickEvent) => {
    clickEvent.preventDefault();
    this.setState({ isDeleting: true });
    api.deleteComment(this.props.id).then(() => {
      this.props.updateComments();
    });
  };
  handleChange = (changeEvent) => {
    this.setState({ body: changeEvent.target.value });
  };
}

export default CommentDeleter;
