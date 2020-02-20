import React, { PureComponent } from "react";
import { Empty, Timeline } from "antd";
import _ from "lodash";
import { Price, TimelineItem } from "./styled";
import { Link } from "react-router-dom";
// import swal from "sweetalert";
// import swalReact from "@sweetalert/with-react";
// import apiCaller from "../../../utils/apiCaller";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
// import { finishTrip } from "../../../services/HistoryTrip/actions.js";
import { connect } from "react-redux";
import moment from "moment";
import * as stationsActions from "../../../redux/actions/stations";

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

  render() {
    const { trips = [], priceFont, large } = this.props;
    // console.log("TCL: render -> this.props.stations", this.props.stations);

    // console.log("TCL: render -> trips", trips);
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
                        ).address
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
                        ).address
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
                    className="flex-basic-25 text-center"
                  >
                    {item.price &&
                      item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    <sup>vnd</sup>
                  </Price>
                  <div className="flex-grow-0">
                    <>
                      <Link
                        to={`/booking-trip/${item._id}`}
                        className={`btn btn-success ${large &&
                          "btn-lg wp-nor"}`}
                      >
                        Book now
                      </Link>
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
    stations: state.stations
  };
};

export default connect(mapStateToProps, stationsActions)(TripItem);
