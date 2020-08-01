import HomePage from "./pages/HomePage/HomePage";
import BookingTrip from "./pages/BookingTrip/BookingTrip";
import InfomationSearch from "./components/TripBookingForm/BookingForm/InfomationSearch";

const routesHome = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/booking-trip/:id",
    exact: true,
    component: BookingTrip,
  },
  {
    path: "/search-trip",
    exact: false,
    component: InfomationSearch,
  },
];

export { routesHome };
