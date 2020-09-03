import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import "./layout.css";
import SingleArticle from "./components/SingleArticle";
import Login from "./components/Login";
import SearchResults from "./components/SearchResults";
import Comments from "./components/Comments";
import ErrorPage from "./components/ErrorPage";

class App extends Component {
  state = {
    user: {
      username: "guest",
      avatar_url:
        "https://lugyc.com/wp-content/themes/onecommunity/images/avatar.gif",
      name: "guest",
    },
  };

  componentDidMount() {
    this.setState({ user: JSON.parse(localStorage.getItem("user")) });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.user.username !== this.state.user.username)
  //     this.setState({ user: JSON.parse(localStorage.getItem("user")) });
  // }

  render() {
    return (
      <div className="App">
        <Header user={this.state.user} />
        <Router className="content">
          <Login path="/login" />
          <HomePage path="/" />
          <SingleArticle path="articles/:id" />
          <SearchResults path="/searchresults" />
          <Comments path="articles/:id/comments" />
          <ErrorPage default status={404} msg={"path not found"} />
        </Router>
      </div>
    );
  }
}

export default App;
