import * as types from "../constants/actionTypes";

export const authLogin = payload => {
  return {
    type: types.AUTH_LOGIN,
    payload
  };
};

export const authLogout = () => {
  return {
    type: types.AUTH_LOGOUT
  };
};
