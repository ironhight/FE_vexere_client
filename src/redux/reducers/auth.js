import * as types from "../constants/actionTypes";
import jwtDecode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

let initialState = {
  user: {},
  isAuthenticated: false
};

const user =
  (localStorage.getItem("auth") && jwtDecode(localStorage.getItem("auth"))) ||
  {};
if (user) {
  if (Date.now() / 1000 <= user.exp) {
    initialState = {
      user: user,
      isAuthenticated: true
    };
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN:
      localStorage.setItem("auth", action.payload);
      return {
        user: jwtDecode(action.payload),
        isAuthenticated: true
      };

    case types.AUTH_LOGOUT:
      localStorage.removeItem("auth");
      setAuthToken();
      return {
        user: {},
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export default authReducer;
