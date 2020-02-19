import api from "../../api";
import * as types from "../constants/actionTypes";

export const getProvinces = () => dispatch => {
  return api
    .get(`/stations`)
    .then(res => {
      dispatch({
        type: types.GET_PROVINCE,
        payload: res.data
      });
    })
    .catch(console.log());
};
