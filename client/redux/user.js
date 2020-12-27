import axios from "axios";

const GET_USER = "GET_USER";

const gotMe = (user) => ({
  type: GET_USER,
  user,
});

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put("/auth/login", credentials);
      dispatch(gotMe(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getMe = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/auth/me");
      dispatch(gotMe(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const signup = (credentials) => {
  return async (dispatch) => {
    try {
      console.log("credentials from signup: ", credentials);
      const { data } = await axios.post("/auth/signup", credentials);
      dispatch(gotMe(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.delete("/auth/logout");
      dispatch(gotMe({}));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
