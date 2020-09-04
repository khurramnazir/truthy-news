import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";

import LoginToggle from "./LoginToggle";

import { Link } from "@reach/router";

import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
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

class Login extends Component {
  state = {
    users: [],
    isLoading: true,
    currentUser: {},
  };

  componentDidMount() {
    api.getUsers().then((users) => {
      this.setState({ users, isLoading: false });
    });
  }
  render() {
    const { users, isLoading } = this.state;

    if (isLoading) return <Loader />;
    return (
      <form>
        <label htmlFor="userList">
          Select User
          <select
            onChange={this.handleSelect}
            name="userList"
            id="userList"
            defaultValue="default"
          >
            <option disabled value="default">
              {" "}
              -- Select a User --{" "}
            </option>
            {users.map((user) => {
              return (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              );
            })}
          </select>
        </label>
        <LoginToggle currentUser={this.state.currentUser} /> <br />
        <StyledLink to="/">
          <StyledButton>go to articles</StyledButton>
        </StyledLink>
      </form>
    );
  }
  handleSelect = (clickEvent) => {
    let userArr = this.state.users;

    let newArr = userArr.filter(function (user) {
      return user.username === clickEvent.target.value;
    });

    this.setState({ currentUser: newArr[0] });
  };
}

export default Login;
