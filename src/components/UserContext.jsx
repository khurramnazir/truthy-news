import React from "react";

const UserContext = React.createContext({
  user: {
    username: "guest",
    avatar_url:
      "https://lugyc.com/wp-content/themes/onecommunity/images/avatar.gif",
    name: "guest",
  },
  setUser: () => {},
});

export default UserContext;
