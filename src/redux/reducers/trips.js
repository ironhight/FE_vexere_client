import * as types from "../constants/actionTypes";

const initialState = [];

const tripsReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TRIPS_LIMIT:
      return action.payload;

    case types.GET_DETAIL_TRIP:
      return action.payload;

    default:
      return state;
  }
};

export default tripsReducers;
