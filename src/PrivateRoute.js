import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";

function PrivateRoute({ component: Component, ...rest }) {
  const { authenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
