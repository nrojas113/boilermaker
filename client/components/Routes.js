import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import UserPage from "./UserPage";
import { getMe } from "../redux/user";
import { connect } from "react-redux";

const Routes = class extends Component {
  async componentDidMount() {
    try {
      await this.props.fetchMe();
      this.props.history.push("/home");
    } catch (err) {
      console.log("error from Routes componentDidMount", err);
    }
  }
  render() {
    // console.log("this.props from Routes: ", this.props);
    return (
      <div>
        <h1>Freya's World</h1>
        <div>This is the first page</div>
        <Switch>
          <Route path="/home" component={UserPage} />
          <Route component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
};

const mapDispatch = (dispatch) => {
  return {
    fetchMe: () => dispatch(getMe()),
  };
};

export default withRouter(connect(null, mapDispatch)(Routes));
