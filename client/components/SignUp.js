import React from "react";
import { connect } from "react-redux";
import { signUp } from "../redux/users";
import LocalSignUpForm from "./LocalSignUpForm";

const SignUp = (props) => {
  console.log("props from SignUp: ", props);
  const { handleSubmit } = props;
  return (
    <div>
      <LocalSignUpForm handleSubmit={handleSubmit} />
    </div>
  );
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault();
      const thunk = signUp({
        email: evt.target.email.value,
        password: evt.target.password.value,
        imageUrl: evt.target.imageUrl.value,
      });
      await dispatch(thunk);
      ownProps.history.push("/home");
    },
  };
};

export default connect(null, mapDispatch)(SignUp);
