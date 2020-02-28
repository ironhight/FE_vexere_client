import React, { PureComponent } from "react";
import { Empty, Timeline, Button } from "antd";
import _ from "lodash";
import { Price, TimelineItem } from "./styled";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { connect } from "react-redux";
import moment from "moment";
import * as stationsActions from "../../../redux/actions/stations";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

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
    const { trips = [], priceFont, large } = this.props;
    const isEmpty = _.isEmpty(trips);
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
                      <Button
                        type="primary"
                        size="large"
                        onClick={() =>
                          this.handleBooking(
                            this.props.Authenticate.isAuthenticated,
                            item._id
                          )
                        }
                        style={{ borderRadius: "5px" }}
                      >
                        Book now
                      </Button>
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
