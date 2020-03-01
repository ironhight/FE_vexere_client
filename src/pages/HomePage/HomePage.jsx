import React from "react";
import TripBooking from "../../components/TripBookingForm/TripBooking";
import Trip from "../../components/Trips/Trips";

const HomePage = () => {
  console.log("run render homepage");
  return (
    <>
      <TripBooking />
      <Trip />
    </>
  );
};

export default HomePage;
