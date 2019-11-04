import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AuthContext = createContext({});

const AuthProvider = props => {
  const [tokens, setTokens] = useState();
  const [currentUser, setCurrentUser] = useState();

  const setAuthData = data => {
    localStorage.setItem("access-token", JSON.stringify(data));
    setTokens(data);
  };

  const logout = () => {
    setTokens();
    setCurrentUser();
    localStorage.removeItem("accsess-token");
  };

  const validateAuth = () => {
    let authData = JSON.parse(localStorage.getItem("access-token"));
    const accessToken = authData["access-token"];
    const clientData = authData["client"];
    const uid = authData["uid"];
    let config = {
      headers: { "access-token": accessToken, client: clientData, uid: uid }
    };

    axios
      .get("http://localhost:3000/api/v1/oc/auth/validate_token", config)
      .then(response => {
        if (response.data.success === true) {
          setAuthData(response.headers);
          setCurrentUser(response.data.data);
        }
      });
  };

  const login = useCallback(async e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      let response = await axios.post(
        "http://localhost:3000/api/v1/oc/auth/sign_in",
        {
          email: email.value,
          password: password.value
        }
      );
      setAuthData(response.headers);
      setCurrentUser(response.data.data);
    } catch (error) {
      //Fix: より良いエラーハンドリングする。
      alert(error);
    }
  }, []);

  useEffect(() => {
    validateAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, tokens, login, logout }}
      {...props}
    />
  );
};

export default AuthProvider;
