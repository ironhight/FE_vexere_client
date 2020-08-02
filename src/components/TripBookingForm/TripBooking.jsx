import React, { Component } from "react";
import { Parallax } from "react-parallax";
import { TripBookingContainer } from "./styled";
import BookingForm from "./BookingForm/BookingForm";

class TripBooking extends Component {
  render() {
    return (
      <div>
        <section className="trip-booking">
          <Parallax
            bgImage="http://d3q2hmjnptzwta.cloudfront.net/banner-main-vi.jpg"
            strength={500}
            bgImageAlt="trip booking"
          >
            <TripBookingContainer>
              <div className="booking-form">
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
