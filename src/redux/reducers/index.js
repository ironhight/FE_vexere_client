import { combineReducers } from "redux";
import Authenticate from "./auth";
import stations from "./stations";
import trips from "./trips";
import countTrips from "./countTrips";

const rootReducers = combineReducers({
  Authenticate,
  stations,
  trips,
  countTrips
});

export default rootReducers;
