import React, { Component } from "react";
import * as api from "../utils/api";
import Comments from "./Comments";
import ToggleView from "./ToggleView";
import Voter from "./Voter";
import Loader from "./Loader";
import ErrorPage from "./ErrorPage";
import styled from "styled-components";

const StyledMain = styled.main`
  margin: 25px;
`;

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    err: null,
    // sort_by: "created_at",
    // order: "desc",
  };
  componentDidMount() {
    api
      .getArticleById(this.props.id)
      .then((article) => {
        this.setState({ article: article, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({
          isLoading: false,
          err: { msg: response.data.msg, status: response.status },
        });
      });
  }

  render() {
    const { article, isLoading, err } = this.state;
    if (err) return <ErrorPage {...err} />;

    if (isLoading) return <Loader />;
    return (
      <StyledMain>
        <section className="article">
          <h3> {article.title} </h3>
          <h4>
            Posted by: {article.author} on {article.created_at.substring(0, 10)}
          </h4>
          <p>{article.body}</p>
          <h4>Comments: {article.comment_count}</h4>
          {JSON.parse(localStorage.getItem("user")).username !== "guest" ? (
            <Voter
              id={article.article_id}
              type={"articles"}
              votes={article.votes}
            />
          ) : (
            <h3>Log in to vote</h3>
          )}
        </section>

        <ToggleView>
          <Comments id={article.article_id} />
        </ToggleView>
      </StyledMain>
    );
  }
}

export default SingleArticle;
