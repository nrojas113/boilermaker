import React from "react";
import { connect } from "react-redux";
import { login } from "../redux/user";
import AuthForm from "./AuthForm";
import OauthLoginForm from "./OauthLoginForm";

const Login = (props) => {
  console.log("props from Login: ", props);
  const { handleSubmit } = props;
  return (
    <div>
      Freya's world from Login
      <AuthForm handleSubmit={handleSubmit} />
      <OauthLoginForm />
    </div>
  );
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    async handleSubmit(evt) {
      try {
        evt.preventDefault();
        const thunk = login({
          email: evt.target.email.value,
          password: evt.target.password.value,
        });
        await dispatch(thunk);
        ownProps.history.push("/home");
      } catch (err) {
        console.log(err);
      }
    },
  };
};

export default connect(null, mapDispatch)(Login);
