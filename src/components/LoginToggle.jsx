import UserContext from "./UserContext";
import { Link } from "@reach/router";
import styled from "styled-components";
import React, { Component } from "react";

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

class LoginToggle extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ user, setUser }) => (
          <Link to="/">
            <StyledButton
              onClick={() => {
                setUser(this.props.currentUser);
                localStorage.setItem(
                  "user",
                  JSON.stringify(this.props.currentUser)
                );
              }}
            >
              Log in
            </StyledButton>
          </Link>
        )}
      </UserContext.Consumer>
    );
  }
}

export default LoginToggle;
