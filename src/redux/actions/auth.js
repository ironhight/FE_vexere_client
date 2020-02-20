import * as types from "../constants/actionTypes";
// import api from "../../api";
// import jwtDecode from "jwt-decode";
// import setAuthToken from "../../utils/setAuthToken";

export const authLogin = payload => {
  return {
    type: types.AUTH_LOGIN,
    payload
  };
};

// export const login = credentials => dispatch => {
//   return api
//     .post("/users/login", credentials)
//     .then(res => {
//       const { token } = res.data;
//       const decode = jwtDecode(token);
//       if (decode.userType === "client")
//         return Promise.reject({ message: "Đăng nhập thất bại" });

//       dispatch(setCurrentUser(decode));

//       localStorage.setItem("token", res.data.token);

//       setAuthToken(token);
//       return Promise.resolve({ message: "Đăng nhập thành công" });
//     })
//     .catch(() =>
//       Promise.reject({
//         message: "Đăng nhập thất bại"
//       })
//     );
// };

// export const setCurrentUser = data => {
//   return {
//     type: types.SET_CURRENT_USER,
//     payload: data
//   };
// };

export const authLogout = () => {
  return {
    type: types.AUTH_LOGOUT
  };
};
