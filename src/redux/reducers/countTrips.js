import * as types from "../constants/actionTypes";

const initialState = [];

//get all trip de tinh length trip
const countTrips = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_TRIPS:
      return action.payload;
    default:
      return state;
  }
};

export default countTrips;
