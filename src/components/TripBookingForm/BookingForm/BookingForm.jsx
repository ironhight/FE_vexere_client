import React, { Component } from "react";
import { DatePickerCustom, ButtonCustom } from "../styled";
import { Select, Form, Col, Row } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as stationActions from "../../../redux/actions/stations";
import * as tripsActions from "../../../redux/actions/trips";
import { withRouter } from "react-router-dom";

import moment from "moment";
import { provinces } from "../../../mock/provinces";

const FormItem = Form.Item;
const { Option } = Select;
class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromProvince: "",
      toProvince: "",
      startTime: "",
    };
  }
  componentDidMount() {
    this.props.getStations();
  }

  handleChangeFrom = (value) => {
    this.setState({ fromProvince: value });
  };

  handleChangeTo = (value) => {
    this.setState({ toProvince: value });
  };

  handleChangeDate = (value, date) => {
    this.setState({ startTime: date });
  };

  handleSubmit = () => {
    const { fromProvince, toProvince, startTime } = this.state;
    this.props.searchTrips(fromProvince, toProvince, startTime);
    this.props.history.push(`/search-trip`);
  };

  render() {
    const { stations } = this.props;
    console.log(this.state.fromProvince);
    return (
      <div>
        <h2
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "22px",
            fontSize: "34px",
          }}
        >
          VeXeRe.com - Hệ thống đặt vé xe khách lớn nhất Việt Nam
        </h2>
        <Row>
          <Col span={8}>
            <FormItem>
              <Select
                name="locationFrom"
                size="large"
                showSearch
                placeholder="Select location"
                optionFilterProp="children"
                onChange={this.handleChangeFrom}
                suffixIcon={<EnvironmentOutlined style={{ color: "#28a745" }} />}
              >
                {provinces.map((province) => {
                  return <Option value={province}>{province}</Option>;
                })}
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              <Select
                name="locationTo"
                size="large"
                showSearch
                onChange={this.handleChangeTo}
                placeholder="Select location"
                optionFilterProp="children"
                suffixIcon={<EnvironmentOutlined style={{ color: "#dc3545" }} />}
              >
                {provinces.map((province) => {
                  return <Option value={province}>{province}</Option>;
                })}
              </Select>
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem>
              <DatePickerCustom
                allowClear={false}
                size="large"
                name="startTime"
                onChange={this.handleChangeDate}
                disabledDate={(current) => {
                  return current && current <= moment().endOf("day");
                }}
              />
            </FormItem>
          </Col>
          <Col span={4}>
            <ButtonCustom
              size="large"
              block
              htmlType="submit"
              className="btn--search"
              onClick={() => this.handleSubmit()}
            >
              TÌM VÉ XE
            </ButtonCustom>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stations: state.stations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStations: () => {
      dispatch(stationActions.getStations);
    },
    searchTrips: (from, to, time) => {
      dispatch(tripsActions.searchTrips(from, to, time));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingForm));
