import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

const Routes = () => {
  return (
    <Router>
      <div>
        <h1>Freya's World</h1>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </div>
    </Router>
  );
};

export default Routes;
