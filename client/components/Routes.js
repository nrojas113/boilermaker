import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";

const Routes = () => {
  return (
    <Router>
      <div>
        <h1>Freya's World</h1>
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
};

export default Routes;
