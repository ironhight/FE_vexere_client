import * as types from "../constants/actionTypes";

const initialState = {
  seatBook: []
};

const seatsReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.SEATS_SELECT:
      if (!action.isBooked) {
        let index = state.seatBook.findIndex(item => item === action.seatCode);
        index === -1
          ? state.seatBook.push(action.seatCode)
          : state.seatBook.splice(index, 1);
      }

      return { ...state };

    default:
      return state;
  }
};

export default seatsReducers;
