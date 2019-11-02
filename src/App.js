import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
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
        <Route path="/admin" component={Admin} />
      </div>
    </Router>
  );
}

export default App;
