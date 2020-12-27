import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../redux/user";

const UserPage = (props) => {
  const { user, handleClick } = props;

  if (!user.id) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div>
        <h1>Welcome back {user.email}</h1>
      </div>
      <div>
        <button onClick={handleClick}>Logout</button>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    async handleClick() {
      try {
        await dispatch(logout());
        ownProps.history.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  };
};

export default connect(mapState, mapDispatch)(UserPage);
