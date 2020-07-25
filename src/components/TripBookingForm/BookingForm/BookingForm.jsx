import React, { Component } from "react";
import { DatePickerCustom, ButtonCustom } from "../styled";
import { Select, Form, Col, Row } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as stationActions from "../../../redux/actions/stations";
import { withRouter } from "react-router-dom";

import moment from "moment";

const FormItem = Form.Item;

class BookingForm extends Component {
  componentDidMount() {
    this.props.getStations();
  }

  render() {
    const { stations } = this.props;
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
                value={stations.locationFrom}
                suffixIcon={<EnvironmentOutlined style={{ color: "#28a745" }} />}
              ></Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              <Select
                name="locationTo"
                size="large"
                showSearch
                value={stations.locationTo}
                placeholder="Select location"
                optionFilterProp="children"
                suffixIcon={<EnvironmentOutlined style={{ color: "#dc3545" }} />}
              ></Select>
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem>
              <DatePickerCustom
                allowClear={false}
                size="large"
                format="DD/MM/YYYY"
                name="startTime"
                value={stations.startTime}
                disabledDate={(current) => {
                  return current && current <= moment().endOf("day");
                }}
              />
            </FormItem>
          </Col>
          <Col span={4}>
            <ButtonCustom size="large" block htmlType="submit" className="btn--search">
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
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingForm));
