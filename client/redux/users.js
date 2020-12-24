import axios from "axios";

const GET_USER = "GET_USER";
const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";

const gotMe = (user) => ({
  type: GET_USER,
  user,
});

const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching,
});

export const fetchMe = () => {
  return async (dispatch) => {
    dispatch(setFetchingStatus(true));
    try {
      const { data } = await axios.get("/auth/me");
      dispatch(gotMe(data));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setFetchingStatus(false));
    }
  };
};

// export const signUp = (credentials) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.post("/auth/signup", credentials);
//       dispatch(gotMe(data));
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };

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

const initialState = {
  user: {
    isFetching: true,
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user,
        },
      };
    case SET_FETCHING_STATUS:
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: action.isFetching,
        },
      };
    default:
      return state;
  }
}
