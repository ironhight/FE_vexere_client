import api from "../../api";
import * as types from "../constants/actionTypes";

export const getTrips = limit => dispatch => {
  return api
    .get(`/trips/${limit}`)
    .then(res => {
      dispatch({
        type: types.GET_TRIPS_LIMIT,
        payload: res.data
      });
    })
    .catch(console.log());
};

export const getAllTrips = () => dispatch => {
  return api
    .get(`/trips`)
    .then(res =>
      dispatch({
        type: types.GET_ALL_TRIPS,
        payload: res.data
      })
    )
    .catch(console.log());
};

export const getDetailTrip = id => dispatch => {
  return api
    .get(`/trips/detail-trip/${id}`)
    .then(res =>
      dispatch({
        type: types.GET_DETAIL_TRIP,
        payload: res.data
      })
    )
    .catch(console.log());
};
