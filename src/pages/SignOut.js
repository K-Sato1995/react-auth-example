import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function SignOut() {
  const { logout } = useContext(AuthContext);

  return <button onClick={logout}>Sign Out</button>;
}

export default SignOut;
