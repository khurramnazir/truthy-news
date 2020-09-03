import React, { Component } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: white;
  border-radius: 12px;
  border: 1px solid black;
  display: inline-block;
  cursor: pointer;
  color: black;
  font-family: "Kumbh Sans", sans-serif;
  font-size: 16px;
  padding: 12px;
  text-decoration: none;
  margin: 20px;
  text-align: center;
`;

class ToggleView extends Component {
  state = {
    isVisible: false,
  };
  render() {
    return (
      <section>
        <StyledButton className="toggleView" onClick={this.handleClick}>
          {this.state.isVisible ? "Hide Comments" : "Show Comments"}
        </StyledButton>

        {this.state.isVisible && this.props.children}
      </section>
    );
  }

  handleClick = (clickEvent) => {
    this.setState((currentState) => {
      return { isVisible: !currentState.isVisible };
    });
  };
}

export default ToggleView;
