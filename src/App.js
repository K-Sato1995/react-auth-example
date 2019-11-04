import React, { useContext } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import "./App.css";
import { AuthContext } from "./context/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

function App() {
  const { tokens } = useContext(AuthContext);

  const fragmentMatcher = new IntrospectionFragmentMatcher({});

  const cache = new InMemoryCache({ fragmentMatcher });
  const URI_ENDPOINT = "http://localhost:3000/graphql";

  const httpLink = createHttpLink({
    uri: URI_ENDPOINT
  });

  const authLink = setContext((_, { headers }) => {
    const accessToken = tokens["access-token"];
    const clientData = tokens["client"];
    const uid = tokens["uid"];
    return {
      headers: {
        ...headers,
        "access-token": accessToken,
        client: clientData,
        uid: uid
      }
    };
  });
  const client = new ApolloClient({ link: authLink.concat(httpLink), cache });
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
