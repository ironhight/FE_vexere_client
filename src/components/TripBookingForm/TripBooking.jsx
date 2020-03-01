import React, { Component } from "react";
import { Parallax } from "react-parallax";
import ParallaxImg from "../../assets/images/parallax.png";
import { TripBookingContainer } from "./styled";
import BookingForm from "./BookingForm/BookingForm";

class TripBooking extends Component {
  render() {
    console.log("run tripBooking");
    return (
      <div>
        <section className="trip-booking">
          <Parallax bgImage={ParallaxImg} bgImageAlt="trip booking">
            <TripBookingContainer>
              <div className="container">
                <BookingForm atHome />
              </div>
            </TripBookingContainer>
          </Parallax>
        </section>
      </div>
    );
  }
}

export default TripBooking;
