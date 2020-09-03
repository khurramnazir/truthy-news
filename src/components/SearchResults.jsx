// import React from "react";
import { Link } from "@reach/router";

import React, { Component } from "react";
import Voter from "./Voter";
import Loader from "./Loader";

class SearchResults extends Component {
  state = {
    filteredArticles: [],
    search: "",
    isLoading: true,
    sort_by: "created_at",
    order: "desc",
  };
  componentDidMount() {
    this.setState({
      filteredArticles: this.props.location.state.filteredArticles,
      search: this.props.location.state.search,
      isLoading: false,
    });
    console.log(this.state.filteredArticles);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.filteredArticles);

    if (prevProps.location.state.search !== this.props.location.state.search) {
      this.setState({
        filteredArticles: this.props.location.state.filteredArticles,
        search: this.props.location.state.search,
      });
    }
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <main>
        <nav className="filter">
          <label htmlFor="votes">
            Sort Articles By
            <button onClick={this.handleClick} name="votes">
              Votes
            </button>
            <button onClick={this.handleClick} name="comment_count">
              Comments
            </button>
            <button onClick={this.handleClick} name="created_at">
              Date
            </button>
          </label>
          <br />

          <br />
        </nav>
        <ul className="searchResults">
          {this.state.filteredArticles.map((article) => {
            return (
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  <h3> {article.title} </h3>
                </Link>
                <h4>
                  Posted by: {article.author} on{" "}
                  {article.created_at.substring(0, 10)} in {article.topic}
                </h4>
                <p>{article.body.substring(0, 250) + "..."}</p>
                <Link to={`/articles/${article.article_id}/comments`}>
                  <h4>Comments: {article.comment_count}</h4>
                </Link>
                <Voter
                  id={article.article_id}
                  type={"articles"}
                  votes={article.votes}
                />
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
  handleSumbit = (submit) => {
    console.log(submit);
  };
  handleClick = (clickEvent) => {
    const sort = clickEvent.target.name;
    let sortedArticles = [...this.state.filteredArticles];

    if (this.state.order === "desc") {
      sortedArticles.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
      this.setState({ filteredArticles: sortedArticles, order: "asc" });
    } else {
      sortedArticles.sort((a, b) => (a[sort] < b[sort] ? 1 : -1));
      this.setState({ filteredArticles: sortedArticles, order: "desc" });
    }

    console.log(this.state.filteredArticles);
  };
}

export default SearchResults;
