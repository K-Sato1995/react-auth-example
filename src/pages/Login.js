import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Login = ({ history }) => {
  const { login } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    login(
      {
        email: email.value,
        password: password.value
      },
      history
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
      <Link to="/signup">Don't have an account?</Link>
    </div>
  );
};

export default withRouter(Login);
