import api from "../../api";
import * as types from "../constants/actionTypes";

//chon so trip de hien thi
export const getTripsLimit = (limit) => (dispatch) => {
  return api
    .get(`/trips/${limit}`)
    .then((res) => {
      dispatch({
        type: types.GET_TRIPS_LIMIT,
        payload: res.data,
      });
    })
    .catch(console.log());
};

export const getAllTrips = () => (dispatch) => {
  return api
    .get(`/trips`)
    .then((res) =>
      dispatch({
        type: types.GET_ALL_TRIPS,
        payload: res.data,
      })
    )
    .catch(console.log());
};

export const getDetailTrip = (id) => (dispatch) => {
  return api
    .get(`/trips/detail-trip/${id}`)
    .then((res) =>
      dispatch({
        type: types.GET_DETAIL_TRIP,
        payload: res.data,
      })
    )
    .catch(console.log());
};

export const searchTrips = (from, to, time) => async (dispatch) => {
  try {
    const result = await api.get(
      `trips/search?fromProvince=${from}&toProvince=${to}&startTime=${time}`
    );
    console.log("searchTrips -> result", result);
    return dispatch({ type: types.SEARCH_TRIPS, payload: result.data });
  } catch (error) {
    console.error(error);
  }
};
