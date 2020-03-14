import React, { Component } from "react";
import { Skeleton, Row, Col } from "antd";
import {
  CarOutlined,
  ArrowRightOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";

import { Price } from "./styled";
import { Wrapper, BodyWrapper } from "../../styled";
import { connect } from "react-redux";

class ContentStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seatBook: []
    };
  }

  changeColor = (seatCode, isBooked) => {
    if (isBooked === false) {
      let index = this.state.seatBook.findIndex(item => item === seatCode);
      index === -1
        ? this.state.seatBook.push(seatCode)
        : this.state.seatBook.splice(index, 1);
    }

    this.setState({
      seatBook: this.state.seatBook
    });
    console.log("ContentStep1 -> getCode", this.state.getCode);
    console.log("ContentStep1 -> this.state.seatBook", this.state.seatBook);
  };

  renderSeats = tripData => {
    console.log("ContentStep1 -> tripData!!!!!!!", tripData.seats);
    const { getCode } = this.state;
    console.log("ContentStep1 -> getCode", getCode);
    let choose;

    return (
      <div>
        {!_.isEmpty(tripData) ? (
          <Row style={{ marginBottom: "30px" }}>
            <Col span={12}>
              <div className="seat__groups">
                <div className="seat__note">
                  <p>Chú thích</p>
                </div>
                <div className="seat__info">
                  <div className="seat__info--empty"></div>
                  <span className="seat__info--name">Còn trống</span>
                </div>
                <div className="seat__info">
                  <div className="seat__info--booked"></div>
                  <span className="seat__info--name">Đã đặt</span>
                </div>
                <div className="seat__info">
                  <div className="seat__info--select"></div>
                  <span className="seat__info--name">Đang chọn</span>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ display: "flex" }}>
                <div>
                  <span style={{ fontSize: "20px" }}>Tầng 1</span>
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      flexWrap: "wrap",
                      width: "200px",
                      backgroundColor: "#E6E6E6",
                      padding: "20px 10px 10px 10px",
                      borderRadius: "18px 18px 5px 5px"
                    }}
                  >
                    {_.get(tripData, "seats", [])
                      .slice(0, 12)
                      .map((s, index) => {
                        this.state.seatBook.includes(s.code)
                          ? (choose = "seat__select")
                          : (choose = "seat_unSelect");

                        return (
                          <td key={index}>
                            <div
                              className={`seat ${choose}`}
                              style={{
                                background: `${
                                  s.isBooked ? "#767676" : "white"
                                }`,
                                border: `${
                                  s.isBooked ? "#E6E6E6" : "1px solid red"
                                }`,
                                width: "50px",
                                margin: "5px",
                                height: "50px",
                                cursor: `${s.isBooked ? "no-drop" : "pointer"}`
                              }}
                              onClick={() => {
                                this.changeColor(s.code, s.isBooked);
                              }}
                            >
                              {s.code}
                            </div>
                          </td>
                        );
                      })}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: "20px" }}>Tầng 2</span>
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      flexWrap: "wrap",
                      width: "200px",
                      backgroundColor: "#E6E6E6",
                      padding: "20px 10px 10px 10px",
                      borderRadius: "18px 18px 5px 5px",
                      marginLeft: "18px"
                    }}
                  >
                    {_.get(tripData, "seats", [])
                      .slice(12, 24)
                      .map((s, index) => {
                        this.state.seatBook.includes(s.code)
                          ? (choose = "seat__select")
                          : (choose = "seat_unSelect");
                        return (
                          <td key={index}>
                            <div
                              className={`seat ${choose}`}
                              style={{
                                background: `${
                                  s.isBooked ? "#767676" : "white"
                                }`,
                                border: `${
                                  s.isBooked ? "#E6E6E6" : "1px solid red"
                                }`,
                                width: "50px",
                                margin: "5px",
                                height: "50px",
                                cursor: `${s.isBooked ? "no-drop" : "pointer"}`
                              }}
                              onClick={() => {
                                this.changeColor(s.code, s.isBooked);
                              }}
                            >
                              {s.code}
                            </div>
                          </td>
                        );
                      })}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        ) : null}
      </div>
    );
  };

  render() {
    const { stations, trips } = this.props;
    // console.log("ContentStep1 -> render -> trips", trips);
    // let tripsData = trips.trips;
    // console.log("ContentStep1 -> render -> tripsData??????", tripsData);
    // console.log("dadsfadsf", this.state.seatBook);
    // console.log("ContentStep1 -> render -> stations", stations);
    // console.log("ContentStep1 -> render -> trips", trips.seats);
    // console.log("ContentStep1 -> render -> trips", trips)
    // const isEmpty = _.isEmpty(stations);
    // console.log("run render Step1");
    // let test;
    // console.log("object", this.state.seatBook);
    return (
      <div className="container">
        <BodyWrapper>
          <Wrapper>
            <Skeleton active loading={false}>
              <h5 className="font-weight-normal d-flex align-items-center mb-3">
                <CarOutlined className="mr-1" /> Trip information
              </h5>
              <div className="d-flex">
                <div className="flex-grow-1" style={{ flexBasis: "35%" }}>
                  <div className="d-flex align-items-center mb-1">
                    {!_.isEmpty(stations) && !_.isEmpty(trips)
                      ? _.get(
                          _.find(stations, {
                            _id: trips.fromStation
                          }),
                          "name",
                          []
                        )
                      : console.log("ERROR")}

                    <ArrowRightOutlined className="mx-2" />
                    {!_.isEmpty(stations) && !_.isEmpty(trips)
                      ? _.get(
                          _.find(stations, {
                            _id: trips.toStation
                          }),
                          "name",
                          []
                        )
                      : console.log("ERROR")}
                  </div>
                  <div className="d-flex align-items-center">
                    <CalendarOutlined className="mr-1" />
                    {moment(trips.startTime).format("DD/MM/YYYY")}
                  </div>
                </div>

                <div style={{ flexBasis: "35%" }}>
                  <p>Ghế</p>
                  <div className="seat__select"></div>
                </div>

                <div style={{ flexBasis: "30%" }}>
                  <p>Tổng cộng</p>

                  <Price priceFont="30px" className="flex-grow-1">
                    {`${trips.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    <sup>vnd</sup>
                  </Price>
                </div>
              </div>
            </Skeleton>
          </Wrapper>
        </BodyWrapper>

        {this.renderSeats(trips)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.Authenticate,
    stations: state.stations,
    trips: state.trips
  };
};

export default connect(mapStateToProps, null)(ContentStep1);
