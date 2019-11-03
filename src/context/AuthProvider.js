import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

const AuthProvider = props => {
  const [authData, setAuthData] = useState();

  useEffect(() => {
    console.log("Use effect runs");
    console.log(authData);
  }, [authData]);

  return <AuthContext.Provider value={{ authData, setAuthData }} {...props} />;
};

export default AuthProvider;
