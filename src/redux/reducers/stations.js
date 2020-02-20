import * as types from "../constants/actionTypes";

const initialState = [];

const stationsReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STATIONS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
export default stationsReducers;
