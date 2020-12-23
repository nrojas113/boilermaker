import React from "react";

const LocalSignUpForm = (props) => {
  console.log("props from LocalLoginForm: ", props);
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" className="input" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="input" />
        </div>
        <div>
          <label htmlFor="imageUrl">Account Image</label>
          <input type="imageUrl" name="imageUrl" className="input" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default LocalSignUpForm;
