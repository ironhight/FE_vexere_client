import React, { Component } from "react";
import { Select, Form, Col, Row, Skeleton, Timeline, Button } from "antd";
import { Formik } from "formik";
import { DatePickerCustom, ButtonCustom } from "../styled";
import moment from "moment";
import { CarTwoTone, CarOutlined, FilterOutlined } from "@ant-design/icons";
import { Wrapper, BodyWrapper } from "../../../styled";
import { connect } from "react-redux";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import _ from "lodash";
import { provinces } from "../../../mock/provinces";

const FormItem = Form.Item;
const { Option } = Select;

class InfomationSearch extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //       fromProvince: "",
  //       toProvince: "",
  //       startTime: "",
  //     };
  //   }

  setFieldValue = (name, value) => {
    console.log(name, value);
  };

  handleBooking = (isAuthenticated, id) => {
    if (!isAuthenticated) {
      return Swal.fire("Cảnh báo!", "Bạn phải đăng nhập để tiến hành đặt vé", "warning");
    } else {
      this.props.history.push(`/booking-trip/${id}`);
    }
  };

  //   handleChangeFrom = (value) => {
  //     this.setState({ fromProvince: value });
  //   };

  //   handleChangeTo = (value) => {
  //     this.setState({ toProvince: value });
  //   };

  render() {
    const { atHome } = this.props;
    // console.log("trips", this.props.trips);
    const { trips, Authenticate } = this.props;
    // console.log("InfomationSearch -> render -> atHome", trips[0]?.startTime);
    const time = trips[0] ? moment(trips[0].startTime).format("DD/MM/YYYY") : "18/06/2020";
    // console.log("InfomationSearch -> render -> time", time);
    return (
      <div className="container" style={{ marginTop: "45px" }}>
        <BodyWrapper>
          <Row>
            <Col span={6}>
              <Wrapper>
                <h5 className="font-weight-normal d-flex align-items-center mb-4">
                  <FilterOutlined className="mr-1" />
                  Tìm kiếm
                </h5>
                <form className="trip-booking__form">
                  <Row type={atHome && "flex"} align="bottom">
                    <Col className={atHome && "px-1"} md={atHome ? 6 : 24}>
                      <label className={atHome ? "font-weight-bold text-white mb-0" : ""}>
                        Nơi đến
                      </label>
                      <FormItem className={atHome ? "mb-0" : ""}>
                        <Select
                          name="locationFrom"
                          size="large"
                          showSearch
                          placeholder="Nơi đi"
                          optionFilterProp="children"
                          value={trips[0]?.fromStation?.province}
                          onChange={(value) => this.setFieldValue("locationFrom", value)}
                        >
                          {provinces.map((province) => {
                            return <Option value={province}>{province}</Option>;
                          })}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col className={atHome && "px-1"} md={atHome ? 6 : 24}>
                      <label className={atHome ? "font-weight-bold text-white mb-0" : ""}>To</label>
                      <FormItem className={atHome ? "mb-0" : ""}>
                        <Select
                          name="locationTo"
                          size="large"
                          showSearch
                          value={trips[0]?.toStation?.province}
                          placeholder="Nơi đến"
                          optionFilterProp="children"
                          onChange={(value) => this.setFieldValue("locationTo", value)}
                          //   suffixIcon={<Icon type="environment" style={{ color: "#dc3545" }} />}
                        >
                          {provinces.map((province) => {
                            return <Option value={province}>{province}</Option>;
                          })}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col className={atHome && "px-1"} md={atHome ? 4 : 24}>
                      <label className={atHome ? "font-weight-bold text-white mb-0" : ""}>
                        Ngày đi
                      </label>
                      <FormItem className={atHome ? "mb-0" : ""}>
                        <DatePickerCustom
                          allowClear={false}
                          size="large"
                          name="startTime"
                          defaultValue={moment(`${time}`, "DD/MM/YYYY")}
                          format={"DD/MM/YYYY"}
                          //   disabledDate={(current) => {
                          //     return current && current <= moment().endOf("day");
                          //   value={moment(trips[0]?.startTime).format("DD/MM/YYYY")}
                          //   }}
                          //   onChange={(value) =>
                          //     this.setFieldValue("startTime", value === null ? undefined : value)
                          //   }
                        />
                      </FormItem>
                    </Col>

                    <Col className={atHome ? "px-1" : ""} md={atHome ? 6 : 24}>
                      {atHome ? (
                        <ButtonCustom type="primary" size="large" block htmlType="submit">
                          <CarOutlined />
                          Tìm kiếm
                        </ButtonCustom>
                      ) : (
                        <ButtonCustom type="primary" size="large" block htmlType="submit">
                          <CarOutlined />
                          Tìm Kiếm
                        </ButtonCustom>
                      )}
                    </Col>
                  </Row>
                </form>
              </Wrapper>
            </Col>
            <Col span={17} offset={1}>
              <Wrapper>
                <h5 className="font-weight-normal d-flex align-items-center mb-4">
                  <CarOutlined className="mr-1" />
                  Chuyến đi
                </h5>
                <Timeline className="trip">
                  {!_.isEmpty(trips) && Array.isArray(trips)
                    ? trips.map((item, index) => (
                        <Timeline.Item
                          key={index}
                          className="trip__item"
                          style={{ marginLeft: "26px" }}
                        >
                          <div className="trip__item__from-to" style={{ fontSize: "16px" }}>
                            {`${item.fromStation.name}, ${item.fromStation.province}`}
                            <FaArrowRight className="mx-3" />
                            {`${item.toStation.name}, ${item.toStation.province}`}
                            <div className="trip__item--day">
                              <span
                                style={{
                                  marginRight: "5px",
                                  bottom: "2px",
                                  position: "relative",
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
                                this.handleBooking(Authenticate.isAuthenticated, item._id)
                              }
                              style={{ borderRadius: "5px" }}
                            >
                              Đặt vé
                            </Button>
                          </div>
                        </Timeline.Item>
                      ))
                    : null}
                </Timeline>
              </Wrapper>
            </Col>
          </Row>
        </BodyWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
    Authenticate: state.Authenticate,
  };
};

export default connect(mapStateToProps, null)(InfomationSearch);
