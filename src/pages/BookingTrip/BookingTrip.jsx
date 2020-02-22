import React, { Component } from "react";
import moment from "moment";
import { Form, Input, Button, Icon, Select, Spin, Skeleton, Empty } from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import * as TripsActions from "../../redux/actions/trips";
import * as StationsActions from "../../redux/actions/stations";

import { Wrapper, BodyWrapper } from "../../styled";
import { Price } from "../../components/Trips/TripItem/styled";

const FormItem = Form.Item;
const { Option } = Select;

class BookingTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationArr: []
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    console.log(id);
    this.props.getDetailTrip(id);
    this.props.getStations();
  }

  // bookingTickets = () => {
  //   const { trip, seatCodes } = this.state;
  //   const data = {
  //     tripId: trip._id,
  //     seatCodes
  //   }

  // api.defaults.headers.common['token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ndXllbnZhbmFAZ21haWwuY29tIiwidXNlclR5cGUiOiJjbGllbnQiLCJpYXQiOjE1Nzg2NjYyNTEsImV4cCI6MTU3ODY2OTg1MX0.HvSOMuMGrtid_8BIwfPCOgKo1xrD0RwMSInLGolSJsc";
  // api.post("/tickets/booking", data)
  // }
  render() {
    const { stations, trips } = this.props;
    console.log("TCL: BookingTrip -> render -> stations", stations);

    const tripData = trips.data;
    console.log("TCL: BookingTrip -> render -> tripData", tripData);
    // const isEmpty = _.isEmpty(stations);
    // console.log("TCL: BookingTrip -> render -> isEmpty", isEmpty);
    console.log("chay 1 lan");
    return (
      <>
        {/* {isEmpty ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : ( */}
        <div className="container">
          <BodyWrapper>
            <Wrapper>
              <Skeleton
                loading={trips.isLoading}
                active
                paragraph={{ rows: 1 }}
              >
                <h5 className="font-weight-normal d-flex align-items-center mb-3">
                  <Icon type="car" className="mr-1" /> Trip information
                </h5>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center mb-1">
                      {stations.name}
                      {tripData.fromStation}
                      <Icon type="arrow-right" className="mx-2" />
                      {tripData.toStation}
                    </div>
                    <div className="d-flex align-items-center">
                      <Icon type="calendar" className="mr-1" />
                      {moment(tripData.startTime).format("DD/MM/YYYY")}
                    </div>
                  </div>

                  <Price priceFont="30px" className="flex-grow-1">
                    {`${tripData.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    <sup>vnd</sup>
                  </Price>
                </div>
              </Skeleton>
            </Wrapper>
          </BodyWrapper>
        </div>
      </>
    );
  }
}

const mapStatetoProps = state => {
  return {
    user: state.Authenticate,
    trips: state.trips,
    stations: state.stations
  };
};
export default connect(mapStatetoProps, {
  ...StationsActions,
  ...TripsActions
})(BookingTrip);
