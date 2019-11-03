import React, { useState, useContext, useCallback } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function Login() {
  const { authData, setAuthData } = useContext(AuthContext);
  const history = useHistory();
  const handleLogin = useCallback(
    async e => {
      e.preventDefault();
      const { email, password } = e.target.elements;
      try {
        console.log(email.value, password.value);
        let response = await axios.post(
          "http://localhost:3000/api/v1/oc/auth/sign_in",
          {
            email: email.value,
            password: password.value
          }
        );
        console.log(response);
        setAuthData(response);
        history.push("/admin");
      } catch (error) {
        //Fix: より良いエラーハンドリングする。
        alert(error);
      }
    },
    [history]
  );

  if (authData) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
      <Link to="/signup">Don't have an account?</Link>
    </div>
  );
}

export default Login;
