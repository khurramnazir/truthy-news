import React, { Component } from "react";
import { Link } from "@reach/router";

import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 15px;
`;

const StyledTitle = styled.section`
  align-items: center;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButtonSection = styled.section`
  // display: flex;
  // flex-direction: row;
  // justify-content: center;
  // align-items: center;
`;

const StyledP = styled.p`
  font-size: 16px;
  margin: 0px 0px 10px 0px;
`;

const StyledH1 = styled.h1`
  font-size: 55px;
  margin: 16px 0px 3px;
`;

const StyledH3 = styled.h3`
  margin: 0px 16px 16px;
  font-size: 16px;
`;

const StyledButton = styled.button`
  background-color: white;
  border-radius: 28px;
  border: 1px solid black;
  display: inline-block;
  cursor: pointer;
  color: black;
  font-family: "Kumbh Sans", sans-serif;
  font-size: 16px;
  padding: 8px 18px;
  text-decoration: none;
  margin: 6px;
`;

class Header extends Component {
  state = {
    user: {},
  };
  componentDidMount() {
    this.setState({ user: this.props.user });
  }

  render() {
    return (
      <StyledHeader className="main-head">
        <StyledTitle>
          <StyledLink to="/">
            <StyledH1>Truthy News</StyledH1>
            <StyledH3>Bringing you the truth(y)</StyledH3>
          </StyledLink>
        </StyledTitle>

        <StyledSection>
          <img
            src={JSON.parse(localStorage.getItem("user")).avatar_url}
            alt=""
            width="50"
            height="50"
          />

          <StyledP>{this.props.user.username}</StyledP>

          <StyledButtonSection>
            <Link to="/login">
              <StyledButton>Log In</StyledButton>
            </Link>

            <StyledButton onClick={this.clearStorage}>Log Out</StyledButton>
          </StyledButtonSection>
        </StyledSection>
      </StyledHeader>
    );
  }
  clearStorage = (clickEvent) => {
    localStorage.clear();
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: "guest",
        avatar_url:
          "https://lugyc.com/wp-content/themes/onecommunity/images/avatar.gif",
        name: "guest",
      })
    );
    window.location.reload();
  };
}

export default Header;
