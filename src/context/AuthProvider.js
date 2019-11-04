import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AuthContext = createContext({});

const AuthProvider = props => {
  const [user, setUser] = useState(null);

  const login = async (data, history) => {
    axios
      .post("http://localhost:3000/api/v1/oc/auth/sign_in", data)
      .then(response => {
        localStorage.setItem("access-token", JSON.stringify(response.headers));
        setUser(response.data.data);
        history.push("/admin");
      })
      .catch(error => {
        alert(error);
      });
  };

  const logout = history => {
    const token = JSON.parse(localStorage.getItem("access-token"));
    let config = {
      headers: {
        "access-token": token["access-token"],
        client: token["client"],
        uid: token["uid"]
      }
    };
    axios
      .delete("http://localhost:3000/api/v1/oc/auth/sign_out", config)
      .then(res => {
        setUser(null);
        localStorage.removeItem("access-token");
        history.push("/login");
      })
      .catch(res => {
        console.log(res);
      });
  };

  const fetchUser = () => {
    let authenticated = user !== null;
    if (authenticated) {
    } else {
      if (isTokenSet()) {
        console.log(isTokenSet());
        const token = JSON.parse(localStorage.getItem("access-token"));
        let config = {
          headers: {
            "access-token": token["access-token"],
            client: token["client"],
            uid: token["uid"]
          }
        };
        axios
          .get("http://localhost:3000/api/v1/oc/auth/validate_token", config)
          .then(res => {
            setUser(res.data.data);
          })
          .catch(res => {
            alert(res);
          });
      }
    }
  };

  const isTokenSet = () => {
    if (localStorage.getItem("access-token") !== null) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login: login,
        logout: logout,
        setUser: setUser,
        authenticated: user !== null
      }}
      {...props}
    />
  );
};

export default AuthProvider;
