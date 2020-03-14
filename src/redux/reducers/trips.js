import * as types from "../constants/actionTypes";

const initialState = [];

const tripsReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TRIPS_LIMIT:
      return action.payload;

    case types.GET_DETAIL_TRIP:
      console.log("tripsReducers ->  action.payload", action.payload);
      return action.payload;

    default:
      return state;
  }
};

export default tripsReducers;
