import api from "../../api";
import * as types from "../constants/actionTypes";

export const searchTrips = query => dispatch => {
  api
    .get(`/trip/${query}`)
    .then(res => {
      dispatch({
        type: types.SEARCH_TRIPS,
        payload: res.data
      });
    })
    .catch(console.log());
};
