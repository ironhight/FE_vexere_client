import api from "../../api";
import * as types from "../constants/actionTypes";

export const getStations = () => dispatch => {
  return api
    .get(`/stations`)
    .then(res => {
      dispatch({
        type: types.GET_STATIONS,
        payload: res.data
      });
    })
    .catch(console.log());
};
