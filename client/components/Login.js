import React from "react";
import { connect } from "react-redux";
import { login } from "../redux/users";
import LocalLoginForm from "./LocalLoginForm";
import OauthLoginForm from "./OauthLoginForm";

const Login = (props) => {
  console.log("props from Login: ", props);
  const { handleSubmit } = props;
  return (
    <div>
      <LocalLoginForm handleSubmit={handleSubmit} />
      <OauthLoginForm />
    </div>
  );
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault();
      const thunk = login({
        email: evt.target.email.value,
        password: evt.target.password.value,
      });
      await dispatch(thunk);
      ownProps.history.push("/home");
    },
  };
};

export default connect(null, mapDispatch)(Login);
