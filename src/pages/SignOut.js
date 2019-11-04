import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { withRouter, Redirect } from "react-router";

function SignOut(history) {
  const { logout } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    logout(history);
  };

  return <button onClick={handleSubmit}>Sign Out</button>;
}

export default withRouter(SignOut);
