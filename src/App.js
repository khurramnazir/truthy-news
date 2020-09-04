import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import "./layout.css";
import SingleArticle from "./components/SingleArticle";
import Login from "./components/Login";
import Comments from "./components/Comments";
import ErrorPage from "./components/ErrorPage";

import UserContext from "./components/UserContext";

class App extends Component {
  setUser = (user) => {
    this.setState({ user });
  };

  state = {
    user: {
      username: "guest",
      avatar_url:
        "https://lugyc.com/wp-content/themes/onecommunity/images/avatar.gif",
      name: "guest",
    },
    setUser: this.setUser,
  };

  componentDidMount() {
    if (localStorage.getItem("user")) {
      this.setState({
        user: JSON.parse(localStorage.getItem("user")),
      });
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <div className="App">
          <Header user={this.state.user} />
          <Router className="content">
            <Login path="/login" />
            <HomePage path="/" />
            <HomePage path="/topics/:topic_slug" />
            <SingleArticle path="articles/:id" />
            <Comments path="articles/:id/comments" />
            <ErrorPage default status={404} msg={"path not found"} />
          </Router>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
