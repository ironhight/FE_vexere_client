import HomePage from "./pages/HomePage/HomePage";
import BookingTrip from "./pages/BookingTrip/BookingTrip";

const routesHome = [
  {
    path: "/",
    exact: true,
    component: HomePage
  },
  {
    path: "/booking-trip",
    exact: false,
    component: BookingTrip
  }
  //   {
  //     path: "/detail-movie/:id",
  //     exact: false,
  //     component: DetailMovie
  //   },
  //   {
  //     path: "/theatres",
  //     exact: false,
  //     component: Theatres
  //   },
  //   {
  //     path: "/seat/:maLichChieu",
  //     exact: false,
  //     component: Seat
  //   },
  //   {
  //     path: "/sign-in",
  //     exact: false,
  //     component: SignIn
  //   },
  //   {
  //     path: "/sign-up",
  //     exact: false,
  //     component: SignUp
  //   }
];

export { routesHome };
