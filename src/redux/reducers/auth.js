import jwtDecode from "jwt-decode";
// import axios from 'axios';

// import { AUTH_LOGIN, AUTH_LOGOUT } from "./actionTypes";
import setAuthToken from "../../utils/setAuthToken";

let initialState = {
  user: {},
  isAuthenticated: false
};

const user =
  (localStorage.getItem("token") && jwtDecode(localStorage.getItem("token"))) ||
  {};
if (user) {
  if (Date.now() / 1000 <= user.exp) {
    initialState = {
      user: user,
      isAuthenticated: true
    };
  }
}

const Authenticate = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_LOGIN":
      localStorage.setItem("token", action.payload);

      return {
        user: jwtDecode(action.payload),
        isAuthenticated: true
      };

    case " AUTH_LOGOUT":
      localStorage.removeItem("token");
      setAuthToken();

      return {
        user: {},
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default Authenticate;
