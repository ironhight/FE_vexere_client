import React, { Component } from "react";
import { Skeleton, Empty, Row, Col } from "antd";
import {
  CarOutlined,
  ArrowRightOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";

import { Price } from "./styled";
import { Wrapper, BodyWrapper } from "../../styled";

class ContentStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seatBook: []
    };
  }

  selectSeat = seatCode => {
    console.log("setState RUN!!!!!!!1");
    this.state.seatBook.push(seatCode);
    this.setState({
      // seatCodes: [...this.state.seatCodes, seatCode]
      seatBook: this.state.seatBook
    });
  };

  renderSeats = tripData => {
    console.log("run!!!!!!!!!!!");
    return (
      <div>
        <Row>
          <Col span={12}>
            <div>
              <p>Chú thích</p>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "1px solid black",
                  backgroundColor: "red"
                }}
              ></div>
              <p>Còn trống</p>
              <p style={{ width: "50px", heigth: "50px" }}>Đã đặt</p>
              <p style={{ width: "50px", heigth: "50px" }}>Đang chọn</p>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ display: "flex" }}>
              <div>
                <h1>TANG 1</h1>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "200px",
                    backgroundColor: "#E6E6E6",
                    padding: "20px 10px 10px 10px",
                    borderRadius: "18px 18px 5px 5px"
                  }}
                >
                  {tripData.seats.slice(0, 12).map((s, index) => {
                    console.log("hahah");
                    return (
                      <div
                        style={{
                          background: `${s.isBooked ? "red" : "grey"}`,
                          width: "50px",
                          margin: "5px",
                          height: "50px"
                        }}
                        key={index}
                        onClick={() => this.state.seatBook.push(s.code)}
                      >
                        {s.code}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h1>TANG 2</h1>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "200px",
                    backgroundColor: "#E6E6E6",
                    padding: "20px 10px 10px 10px",
                    borderRadius: "18px 18px 5px 5px",
                    marginLeft: "18px"
                  }}
                >
                  {tripData.seats.slice(12, 24).map((s, index) => {
                    console.log("hahah");
                    return (
                      <div
                        style={{
                          background: `${s.isBooked ? "red" : "grey"}`,
                          width: "50px",
                          margin: "5px",
                          height: "50px"
                        }}
                        key={index}
                        onClick={() => this.state.seatBook.push(s.code)}
                      >
                        {s.code}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    const { stations, trips } = this.props;
    const isEmpty = _.isEmpty(stations);
    console.log("object", this.state.seatBook);
    return (
      <div>
        {isEmpty ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <div className="container">
            <BodyWrapper>
              <Wrapper>
                <Skeleton
                  loading={trips.isLoading}
                  active
                  paragraph={{ rows: 1 }}
                >
                  <h5 className="font-weight-normal d-flex align-items-center mb-3">
                    <CarOutlined className="mr-1" /> Trip information
                  </h5>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center mb-1">
                        {
                          stations.find(
                            elm => elm._id === trips.data.fromStation
                          ).name
                        }
                        <ArrowRightOutlined className="mx-2" />
                        {
                          stations.find(elm => elm._id === trips.data.toStation)
                            .name
                        }
                      </div>
                      <div className="d-flex align-items-center">
                        <CalendarOutlined className="mr-1" />
                        {moment(trips.data.startTime).format("DD/MM/YYYY")}
                      </div>
                    </div>

                    <Price priceFont="30px" className="flex-grow-1">
                      {`${trips.data.price}`.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}{" "}
                      <sup>vnd</sup>
                    </Price>
                  </div>
                </Skeleton>
              </Wrapper>
            </BodyWrapper>

            {this.renderSeats(trips.data)}
          </div>
        )}
      </div>
    );
  }
}

export default ContentStep1;
