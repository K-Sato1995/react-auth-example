import React, { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useHistory } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  return (
    <div>
      <form onSubmit={login}>
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
      <Link to="/signup">Don't have an account?</Link>
    </div>
  );
}

export default Login;
