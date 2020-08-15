import React from "react";
import TripBooking from "../../components/TripBookingForm/TripBooking";
import Trip from "../../components/Trips/Trips";
import Introduction from "../../components/Introduction/Introduction";
import Summary from "../../components/Summary/Summary";

const HomePage = () => {
  console.log("run render homepage");
  return (
    <>
      <TripBooking />
      <Trip />
      <Introduction />
      <Summary />
    </>
  );
};

export default HomePage;
