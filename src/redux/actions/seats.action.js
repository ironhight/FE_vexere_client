import * as types from "../constants/actionTypes";

export const seatsSelect = (seatCode, isBooked) => {
  return {
    type: types.SEATS_SELECT,
    seatCode,
    isBooked
  };
};
