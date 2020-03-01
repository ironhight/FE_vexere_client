import React, { PureComponent } from "react";
import { Timeline, Button } from "antd";
import _ from "lodash";
// import { Price, TimelineItem } from "./styled";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { connect } from "react-redux";
import moment from "moment";
import * as stationsActions from "../../../redux/actions/stations";
import * as tripsActions from "../../../redux/actions/trips";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

class TripItem extends PureComponent {
  componentDidMount() {
    this.props.getStations();
    this.props.getAllTrips();
  }

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
    console.log("TripItem -> render -> stations", stations);
    console.log("TripItem -> render -> trips", trips);
    return (
      <>
        <Timeline style={{ marginLeft: "50px" }}>
          {!_.isEmpty(trips)
            ? trips.map((item, index) => {
                console.log(
                  "TripItem -> render -> stations.find(elm => elm._id === item.fromStation)",
                  stations.find(elm => elm._id === item.fromStation)
                );
                return (
                  <Timeline.Item key={index}>
                    <div
                      style={{
                        fontSize: "18px",
                        flexBasis: "50%"
                      }}
                    >
                      <div>
                        {/* {item.fromStation} */}
                        {stations.find(elm => elm._id === item.fromStation)}
                        {`, `}
                        {stations.find(elm => elm._id === item.fromStation)}
                        <FaArrowRight className="mx-3" />
                        {item.toStation}
                        {/* {stations.find(elm => elm._id === item.toStation).name}
                    {`, `}
                    {stations.find(elm => elm._id === item.toStation).province} */}
                      </div>

                      <div style={{ opacity: "0.8" }}>
                        <FaCalendarAlt />
                        {moment(item.startTime).format("DD/MM/YYYY")}
                      </div>
                    </div>

                    <div>
                      {item.price} <span>vnđ</span>
                    </div>

                    <div>
                      <>
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
                      </>
                    </div>
                  </Timeline.Item>
                );
              })
            : ""}
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

const mapDispatchToProps = dispatch => {
  return {
    getStations: () => {
      dispatch(stationsActions.getStations);
    },
    getAllTrips: () => {
      dispatch(tripsActions.getAllTrips);
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TripItem)
);
