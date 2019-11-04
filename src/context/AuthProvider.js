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
    localStorage.removeItem("access-token");
  };

  const checkAuthData = () => {
    let authData = JSON.parse(localStorage.getItem("access-token"));

    if (authData) {
      const accessToken = authData["access-token"];
      const clientData = authData["client"];
      const uid = authData["uid"];
      let config = {
        headers: { "access-token": accessToken, client: clientData, uid: uid }
      };

      axios
        .get("http://localhost:3000/api/v1/oc/auth/validate_token", config)
        .then(response => {
          return response;
        });
    }
  };

  const login = async (data, history) => {
    axios
      .post("http://localhost:3000/api/v1/oc/auth/sign_in", data)
      .then(response => {
        setAuthData(response.headers);
        setCurrentUser(response.data.data);
        history.push("/admin");
      })
      .catch(error => {
        alert(error);
      });
  };

  useEffect(() => {
    checkAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, tokens, login, logout }}
      {...props}
    />
  );
};

export default AuthProvider;
