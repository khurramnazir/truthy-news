import React, { useContext } from "react";
import UserContext from "./UserContext";

import { Link } from "@reach/router";
import styled from "styled-components";

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

const LoginToggle = (props) => {
  const user = useContext(UserContext);
  const { setUser } = user;
  const selectedUser = props.currentUser;

  return (
    <Link to="/">
      <StyledButton
        onClick={() => {
          setUser(selectedUser);
        }}
      >
        Log in
      </StyledButton>
    </Link>
  );
};

export default LoginToggle;
