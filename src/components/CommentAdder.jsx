import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import styled from "styled-components";

const StyledInput = styled.input`
  background-color: white;
  border-radius: 12px;
  border: 1px solid black;
  display: inline-block;
  cursor: pointer;
  color: black;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  padding: 6px;
  text-decoration: none;
  margin: 3px;
  width: 75%;
  height: 50px;
`;

class CommentAdder extends Component {
  state = {
    username: "",
    body: "",
    isPosting: false,
  };

  componentDidMount() {
    this.setState({
      username: JSON.parse(localStorage.user).username,
    });
  }
  render() {
    const StyledButton = styled.button`
      background-color: white;
      border-radius: 6px;
      border: 1px solid black;
      cursor: pointer;
      color: black;
      font-family: "Kumbh Sans", sans-serif;
      font-size: 16px;
      padding: 6px;
      text-decoration: none;
      margin: 3px;
      width: 35%;
      ${this.state.body === "" &&
      `
      background-color: lightgrey;
      color: grey;
      `}
    `;
    const { body } = this.state;
    const isEnabled = body.length > 0;
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <StyledInput
            type="text"
            name="userComments"
            id="userComments"
            placeholder="Add a comment"
            onChange={this.handleChange}
          />{" "}
          <br />
          <StyledButton disabled={!isEnabled} type="submit">
            Post Comment
          </StyledButton>
        </form>
        {this.state.isPosting && <Loader />}
      </section>
    );
  }
  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    this.setState({ isPosting: true });
    api
      .postComment(this.props.id, this.state.username, this.state.body)
      .then((comment) => {
        this.props.insertNewComment(comment);
        this.setState({ isPosting: false, body: "" });
      });
  };
  handleChange = (changeEvent) => {
    this.setState({ body: changeEvent.target.value });
  };
}

export default CommentAdder;
