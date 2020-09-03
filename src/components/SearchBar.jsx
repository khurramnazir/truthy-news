import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";

class SearchBar extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    order: "desc",
    filteredArticles: [],
    search: "",
  };

  componentDidMount() {
    const { sort_by, order } = this.state;
    api.getArticles(sort_by, order).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  }
  render() {
    return (
      <form onInput={this.handleSubmit}>
        <label htmlFor="searchBox">Search all Articles</label>
        <input
          type="search"
          id="searchBox"
          name="searchBox"
          placeholder="Search"
        />

        <Link
          to="/searchresults"
          state={{
            filteredArticles: this.state.filteredArticles,
            search: this.state.search,
          }}
        >
          <input type="submit" />
        </Link>
      </form>
    );
  }
  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const { sort_by, order } = this.state;
    api.getArticles(sort_by, order).then((articles) => {
      this.setState({ articles, isLoading: false });
    });

    let filteredArticles = this.state.articles.filter((article) => {
      return (
        article.body
          .toLowerCase()
          .indexOf(submitEvent.target.value.toLowerCase()) !== -1 ||
        article.title
          .toLowerCase()
          .indexOf(submitEvent.target.value.toLowerCase()) !== -1 ||
        article.topic
          .toLowerCase()
          .indexOf(submitEvent.target.value.toLowerCase()) !== -1
      );
    });

    if (filteredArticles.length !== 0) {
      this.setState({
        filteredArticles: filteredArticles,
        search: submitEvent.target.value,
      });
    }
  };
}

export default SearchBar;
