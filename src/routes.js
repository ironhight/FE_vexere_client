import HomePage from "./pages/HomePage/HomePage";
import BookingTrip from "./pages/BookingTrip/BookingTrip";
import InfomationSearch from "./components/TripBookingForm/BookingForm/InfomationSearch";
import ProfilePage from "./pages/Profile/ProfilePage";
import EditProfile from "./pages/Profile/EditProfile";

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
    exact: true,
    component: InfomationSearch,
  },
  {
    path: "/my-profile",
    exact: true,
    component: ProfilePage,
  },
  {
    path: "/edit-profile",
    exact: true,
    component: EditProfile,
  },
];

export { routesHome };
