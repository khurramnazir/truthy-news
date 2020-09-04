import * as api from "../utils/api";
import React, { Component } from "react";
import Voter from "./Voter";
import Loader from "./Loader";
import UserContext from "./UserContext";

import CommentAdder from "./CommentAdder";
import CommentDeleter from "./CommentDeleter";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: white;
  border-radius: 12px;
  border: 1px solid black;
  display: inline-block;
  cursor: pointer;
  color: black;
  font-family: "Kumbh Sans", sans-serif;
  font-size: 12px;
  padding: 6px;
  text-decoration: none;
  margin: 3px;
  text-align: center;
`;

class Comments extends Component {
  static contextType = UserContext;
  state = {
    article: [],
    isLoading: true,
    sort_by: "created_at",
    order: "desc",
    comments: [],
  };

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    api
      .getComments(this.props.id, this.props.sort_by, this.props.order)
      .then((comments) => {
        this.setState({ comments, isLoading: false });
      });
  };

  insertNewComment = (comment) => {
    this.setState((currentState) => {
      return {
        comments: [comment, ...currentState.comments],
        isLoading: false,
      };
    });
  };

  render() {
    const { user } = this.context;
    const { comments, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <section>
        <h3>Comments</h3>
        {user.username !== "guest" ? (
          <CommentAdder
            id={this.props.id}
            insertNewComment={this.insertNewComment}
          />
        ) : (
          <h3>Log in to comment</h3>
        )}

        <nav className="filter">
          <label htmlFor="votes">
            Sort Comments By: <br />
            <StyledButton onClick={this.handleClick} name="votes">
              Votes
            </StyledButton>
            <StyledButton onClick={this.handleClick} name="author">
              Author
            </StyledButton>
            <StyledButton onClick={this.handleClick} name="created_at">
              Date
            </StyledButton>
          </label>
        </nav>
        <ul className="commentlist">
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <h4>
                  Posted by: {comment.author} on{" "}
                  {comment.created_at.substring(0, 10)}
                </h4>
                <p>{comment.body}</p>
                {user.username !== "guest" ? (
                  <Voter
                    id={comment.comment_id}
                    type={"comments"}
                    votes={comment.votes}
                  />
                ) : (
                  <h3>Log in to vote</h3>
                )}
                {user.username === comment.author && (
                  <CommentDeleter
                    id={comment.comment_id}
                    updateComments={this.getComments}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
  handleClick = (clickEvent) => {
    this.setState({ isLoading: true });

    const sort = clickEvent.target.name;
    const { id } = this.props;
    const { order } = this.state;

    if (this.state.order === "desc") {
      api.getComments(id, sort, order).then((res) => {
        this.setState({
          comments: res,
          sort_by: sort,
          order: "asc",
          isLoading: false,
        });
      });
    } else {
      api.getComments(id, sort, order).then((res) => {
        this.setState({
          comments: res,
          sort_by: sort,
          order: "desc",
          isLoading: false,
        });
      });
    }
  };
}

export default Comments;
