import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import UserPage from "./UserPage";

const Routes = () => {
  return (
    <Router>
      <div>
        <h1>Freya's World</h1>
        <div>This is the first page</div>
        <Route path="/home" component={UserPage} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
};

export default Routes;
