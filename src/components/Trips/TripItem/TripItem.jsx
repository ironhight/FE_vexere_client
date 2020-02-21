import React, { PureComponent } from "react";
import { Empty, Timeline } from "antd";
import _ from "lodash";
import { Price, TimelineItem } from "./styled";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { connect } from "react-redux";
import moment from "moment";
import * as stationsActions from "../../../redux/actions/stations";
import swal from "sweetalert";
import { withRouter } from "react-router-dom";

class TripItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // rate: 0
    };
  }

  componentDidMount() {
    this.props.getStations();
  }

  handleBooking = isAuthenticated => {
    if (!isAuthenticated) {
      console.log("then");
      return swal({
        text: "You have to login for booking trip",
        icon: "warning",
        buttons: false,
        timer: 1500
      });
    } else {
      console.log("haha");
      this.props.history.push("/booking-trip");
    }
  };

  render() {
    const { trips = [], priceFont, large } = this.props;
    // console.log("TCL: render -> this.props.stations", this.props.stations);

    // console.log("TCL: render -> trips", trips);
    const isEmpty = _.isEmpty(trips);
    // console.log(
    //   "TCL: render -> this.props.Authenticate.isAuthenticate",
    //   this.props.Authenticate.isAuthenticated
    // );
    return (
      <>
        {isEmpty ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Timeline>
            {_.map(trips, (item, index) => {
              return (
                <TimelineItem key={index}>
                  <div className="flex-basic-50 fz-16">
                    <div className="d-flex align-items-center mb-1">
                      {
                        this.props.stations.find(
                          elm => elm._id === item.fromStation
                        ).name
                      }
                      {`, `}
                      {
                        this.props.stations.find(
                          elm => elm._id === item.fromStation
                        ).province
                      }
                      <FaArrowRight className="mx-3" />
                      {
                        this.props.stations.find(
                          elm => elm._id === item.toStation
                        ).name
                      }
                      {`, `}
                      {
                        this.props.stations.find(
                          elm => elm._id === item.toStation
                        ).province
                      }
                    </div>
                    <div className="d-flex align-items-center">
                      <FaCalendarAlt className="mr-1" />
                      {moment(item.startTime).format("DD/MM/YYYY")}
                    </div>
                  </div>

                  <Price
                    priceFont={priceFont}
                    className="flex-basic-25 text-left "
                  >
                    {item.price &&
                      item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    <sup>vnd</sup>
                  </Price>
                  <div className="flex-grow-0">
                    <>
                      <button
                        type="button"
                        className={`btn btn-success ${large &&
                          "btn-lg wp-nor"}`}
                        onClick={() =>
                          this.handleBooking(
                            this.props.Authenticate.isAuthenticated
                          )
                        }
                      >
                        Book now
                      </button>
                    </>
                  </div>
                </TimelineItem>
              );
            })}
          </Timeline>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    stations: state.stations,
    Authenticate: state.Authenticate
  };
};

export default withRouter(connect(mapStateToProps, stationsActions)(TripItem));
