import { combineReducers } from "redux";
import Authenticate from "./auth";
import stations from "./stations";
import trips from "./trips";
import countTrips from "./countTrips";
import seatsReducers from "./seats.reducer";

const rootReducers = combineReducers({
  Authenticate,
  stations,
  trips,
  countTrips,
  seatsReducers
});

export default rootReducers;
