import React, { Component } from "react";
import ArticlesList from "./ArticlesList";
import * as api from "../utils/api";
import styled from "styled-components";

import Loader from "./Loader";

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

class HomePage extends Component {
  state = {
    articles: [],
    topics: [],
    isLoading: true,
    sort_by: "created_at",
    order: "desc",

    chosenTopic: "",
  };

  componentDidMount() {
    const { sort_by, order, chosenTopic } = this.state;
    api.getArticles(sort_by, order, chosenTopic).then((articles) => {
      this.setState({
        articles,
        isLoading: false,

        chosenTopic: chosenTopic,
      });
    });
    api.getTopics().then((topics) => {
      this.setState({ topics });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order, chosenTopic } = this.state;
    if (prevState.chosenTopic !== this.state.chosenTopic) {
      api.getArticles(sort_by, order, chosenTopic).then((articles) => {
        this.setState({
          articles,
          isLoading: false,
          chosenTopic: chosenTopic,
        });
      });
      api.getTopics().then((topics) => {
        this.setState({ topics });
      });
    }
  }

  render() {
    const { articles, isLoading, topics } = this.state;
    if (isLoading) return <Loader />;
    return (
      <main>
        <nav className="filter">
          <label className="sortBar" htmlFor="votes">
            Sort Articles By
            <StyledButton onClick={this.handleClick} name="votes">
              Votes
            </StyledButton>
            <StyledButton onClick={this.handleClick} name="comment_count">
              Comments
            </StyledButton>
            <StyledButton onClick={this.handleClick} name="created_at">
              Date
            </StyledButton>
          </label>
          <br />
          <label htmlFor="topicsList">
            Filter by Topic
            <select
              onChange={this.handleSelect}
              name="topicsList"
              id="topicsList"
              defaultValue={this.state.chosenTopic}
            >
              <option value={`${""}`}>All</option>
              {topics.map((topic) => {
                return (
                  <option key={topic.slug} value={topic.slug}>
                    {topic.slug}
                  </option>
                );
              })}
            </select>
          </label>

          <br />
        </nav>
        <ArticlesList articles={articles} />
      </main>
    );
  }
  handleClick = (clickEvent) => {
    const sort = clickEvent.target.name;
    this.setState({ isLoading: true });

    if (this.state.order === "desc") {
      api
        .getArticles(sort, this.state.order, this.state.chosenTopic)
        .then((res) => {
          this.setState({
            articles: res,
            sort_by: sort,
            order: "asc",
            isLoading: false,
          });
        });
    } else {
      api
        .getArticles(sort, this.state.order, this.state.chosenTopic)
        .then((res) => {
          this.setState({
            articles: res,
            sort_by: sort,
            order: "desc",
            isLoading: false,
          });
        });
    }
  };
  handleSelect = (clickEvent) => {
    if (clickEvent.target.value !== "All") {
      this.setState({ chosenTopic: clickEvent.target.value });
    } else {
      this.setState({ chosenTopic: "" });
    }
  };
}

export default HomePage;
