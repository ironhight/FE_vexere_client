import React, { Component } from "react";
import { Timeline, Button } from "antd";
import _ from "lodash";
// import { Price, TimelineItem } from "./styled";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

class TripItem extends Component {
  handleBooking = (isAuthenticated, id) => {
    if (!isAuthenticated) {
      return Swal.fire(
        "Warning!",
        "You have to login for booking trip",
        "warning"
      );
    } else {
      this.props.history.push(`/booking-trip/${id}`);
    }
  };

  render() {
    console.log("Run render TripItem");
    const { trips, stations, Authenticate } = this.props;
    // console.log("TripItem -> render -> trips", trips);
    // let tripsData = trips.trips;
    // console.log("TripItem -> render -> tripsData", tripsData);
    return (
      <>
        <Timeline className="trip">
          {!_.isEmpty(trips) && Array.isArray(trips)
            ? trips.map((item, index) => (
                <Timeline.Item key={index} className="trip__item">
                  <div className="trip__item__from-to">
                    {!_.isEmpty(stations) &&
                      stations.find(elm => elm._id === item.fromStation).name +
                        ", " +
                        stations.find(elm => elm._id === item.fromStation)
                          .province}
                    <FaArrowRight className="mx-3" />
                    {!_.isEmpty(stations) &&
                      stations.find(elm => elm._id === item.toStation).name +
                        ", " +
                        stations.find(elm => elm._id === item.toStation)
                          .province}

                    <div className="trip__item--day">
                      <span
                        style={{
                          marginRight: "5px",
                          bottom: "2px",
                          position: "relative"
                        }}
                      >
                        <FaCalendarAlt />
                      </span>
                      {moment(item.startTime).format("DD/MM/YYYY")}
                    </div>
                  </div>

                  <div className="trip__item__price">{item.price} vnd</div>
                  <div className="trip__item__btn">
                    <Button
                      type="primary"
                      size="large"
                      onClick={() =>
                        this.handleBooking(
                          Authenticate.isAuthenticated,
                          item._id
                        )
                      }
                      style={{ borderRadius: "5px" }}
                    >
                      Book now
                    </Button>
                  </div>
                </Timeline.Item>
              ))
            : null}
        </Timeline>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    stations: state.stations,
    Authenticate: state.Authenticate,
    trips: state.trips
  };
};

export default withRouter(connect(mapStateToProps, null)(TripItem));
