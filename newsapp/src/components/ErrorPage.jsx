import React from "react";

const ErrorPage = ({ msg, status }) => {
  return (
    <div>
      <h1>{status}</h1> <br />
      <h3>{msg}</h3>
    </div>
  );
};

export default ErrorPage;
