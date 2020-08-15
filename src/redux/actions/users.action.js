import api from "../../api";
import swal from "sweetalert";
import * as types from "../constants/actionTypes";

export const getProfileAdmin = () => (dispatch) => {
  return api
    .get(`/users/me`)
    .then((res) => {
      dispatch({
        type: types.GET_PROFILE_ADMIN,
        payload: res.data,
      });
    })
    .catch(console.log());
};

export const updateAdmin = (userID, value, callbackThen, callbackCatch) => (dispatch) => {
  return api
    .patch(`users/me`, value)
    .then((res) => {
      dispatch({
        type: types.UPDATE_PROFILE_ADMIN,
        payload: res.data,
      });
      Promise.resolve(res.data);
      swal({
        text: "Update successfully",
        icon: "success",
        buttons: false,
        timer: 1500,
      });
      callbackThen();
    })
    .catch((err) => callbackCatch(err));
};

export const updatePassword = (userID, value, callbackThen, callbackReset, callbackCatch) => (
  dispatch
) => {
  return api
    .put(`users/change-password/me`, value)
    .then((res) => {
      dispatch({ type: types.UPDATE_PASSWORD_ADMIN, payload: res.data });
      Promise.resolve(res.data);
      swal({
        text: "Update successfully",
        icon: "success",
        buttons: false,
        timer: 1500,
      });
      callbackThen();
      callbackReset();
    })
    .catch((err) => callbackCatch(err));
};

export const updateAvatar = (value, config, callbackThen) => (dispatch) => {
  return api
    .post(`users/me/avatar`, value, config)
    .then((res) => {
      dispatch({ type: types.UPDATE_AVATAR, payload: res.data });
      console.log("success");
      swal({
        text: "Update successfully",
        icon: "success",
        buttons: false,
        timer: 1500,
      });
      callbackThen();
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const getAvatar = (id) => (dispatch) => {
  return api
    .get(`users/me/${id}/avatar`)
    .then((res) => {
      dispatch({ type: types.GET_AVATAR, payload: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
};
