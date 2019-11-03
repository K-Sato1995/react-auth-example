import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function SignOut() {
  const { setAuthData } = useContext(AuthContext);

  function onLogout() {
    setAuthData();
  }
  return <button onClick={onLogout}>Sign Out</button>;
}

export default SignOut;
