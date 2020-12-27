import React from "react";

const OauthLoginForm = () => {
  return (
    <form method="get" action="/auth/google">
      <button type="submit">Login With Google</button>
    </form>
  );
};

export default OauthLoginForm;
