import * as types from "../constants/actionTypes";

const initialState = {
  isLoading: true,
  data: []
};

const tripsReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TRIPS_LIMIT:
      return {
        isLoading: false,
        data: action.payload
      };
    default:
      return state;
  }
};

export default tripsReducers;
