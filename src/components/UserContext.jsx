import React, { Component } from "react";

const UserContext = React.createContext({
  username: "guest",
  avatar_url:
    "https://lugyc.com/wp-content/themes/onecommunity/images/avatar.gif",
  name: "guest",
});

class UserProvider extends Component {
  // Context state
  state = {
    user: {},
  };

  // Method to update state
  setUser = (user) => {
    this.setState((prevState) => ({ user }));
  };

  render() {
    const { children } = this.props;
    const { user } = this.state;
    const { setUser } = this;

    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserContext;

export { UserProvider };
