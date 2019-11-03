import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

const AuthProvider = props => {
  const [authData, setAuthData] = useState();

  const setTokens = data => {
    localStorage.setItem("access-token", JSON.stringify(data));
    setAuthData(data);
  };

  useEffect(() => {
    console.log("Use effect runs");
    console.log(authData);
  }, [authData]);

  return <AuthContext.Provider value={{ authData, setTokens }} {...props} />;
};

export default AuthProvider;
