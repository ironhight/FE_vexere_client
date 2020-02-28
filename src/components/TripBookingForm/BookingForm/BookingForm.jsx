import React, { Component } from "react";
import { DatePickerCustom, ButtonCustom } from "../styled";
import { Select, Form, Col, Row } from "antd";
import { EnvironmentOutlined, CarOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import { object, string } from "yup";
import _ from "lodash";
import queryString from "query-string";
import { connect } from "react-redux";
// import { searchTrips } from "../../../redux/actions/trips";
import * as stationActions from "../../../redux/actions/stations";
import { withRouter } from "react-router-dom";

import moment from "moment";

const FormItem = Form.Item;
const { Option } = Select;

class BookingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationFrom: undefined,
      locationTo: undefined,
      startTime: undefined
    };
  }

  searchTrips = location => {
    this.props.searchTrips(location);
  };

  componentDidMount() {
    this.props.getStations();

    if (this.props.atHome) return;

    const { location } = this.props;
    const stringObject = queryString.parse(location.search);

    if (_.isEmpty(location.search)) return;

    this.setState({
      locationFrom: stringObject.from,
      locationTo: stringObject.to,
      startTime: moment(stringObject.startTime),
      // slot: stringObject.slot,
      page: 0
    });

    this.searchTrips(location.search);
  }

  render() {
    const { atHome, history } = this.props;
    const { locationFrom, locationTo, startTime } = this.state;

    const locations = _.map(this.props.stations, (item, index) => {
      // console.log("TCL: BookingForm -> render -> item.name", item.name);
      return (
        <Option key={index} value={item._id}>
          {item.name}
        </Option>
      );
    });

    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          locationFrom: locationFrom,
          locationTo: locationTo,
          startTime: startTime
        }}
        validationSchema={object().shape({
          locationFrom: string().required("This field is required"),
          locationTo: string().required("This field is required"),
          startTime: string().required("This field is required")
        })}
        onSubmit={values => {
          const string = queryString.stringify({
            from: values.locationFrom,
            to: values.locationTo,
            startTime: values.startTime,
            page: 0
          });

          history.push(`/trips/search?${string}`);

          if (!atHome) {
            this.props.isLoading(true);
            this.searchTrips(`?${string}`);
          }
        }}
        render={({ setFieldValue, values, touched, errors, handleSubmit }) => (
          <form className="trip-booking__form" onSubmit={handleSubmit}>
            <Row type={atHome && "flex"} align="bottom">
              <Col className={atHome && "px-1"} md={atHome ? 6 : 24}>
                <label
                  className={atHome ? "font-weight-bold text-white mb-0" : ""}
                >
                  From
                </label>
                <FormItem
                  className={atHome ? "mb-0" : ""}
                  validateStatus={
                    touched.locationFrom && errors.locationFrom && "error"
                  }
                  help={!atHome && touched.locationFrom && errors.locationFrom}
                >
                  <Select
                    name="locationFrom"
                    size="large"
                    showSearch
                    placeholder="Select location"
                    optionFilterProp="children"
                    value={values.locationFrom}
                    onChange={value => setFieldValue("locationFrom", value)}
                    suffixIcon={
                      <EnvironmentOutlined style={{ color: "#28a745" }} />
                    }
                  >
                    {locations}
                    {/* hahah */}
                  </Select>
                </FormItem>
              </Col>
              <Col className={atHome && "px-1"} md={atHome ? 6 : 24}>
                <label
                  className={atHome ? "font-weight-bold text-white mb-0" : ""}
                >
                  To
                </label>
                <FormItem
                  className={atHome ? "mb-0" : ""}
                  validateStatus={
                    touched.locationTo && errors.locationTo && "error"
                  }
                  help={!atHome && touched.locationTo && errors.locationTo}
                >
                  <Select
                    name="locationTo"
                    size="large"
                    showSearch
                    value={values.locationTo}
                    placeholder="Select location"
                    optionFilterProp="children"
                    onChange={value => setFieldValue("locationTo", value)}
                    suffixIcon={
                      <EnvironmentOutlined style={{ color: "#dc3545" }} />
                    }
                  >
                    {locations}
                  </Select>
                </FormItem>
              </Col>
              <Col className={atHome && "px-1"} md={atHome ? 6 : 24}>
                <label
                  className={atHome ? "font-weight-bold text-white mb-0" : ""}
                >
                  Date
                </label>
                <FormItem
                  className={atHome ? "mb-0" : ""}
                  validateStatus={
                    touched.startTime && errors.startTime && "error"
                  }
                  help={!atHome && touched.startTime && errors.startTime}
                >
                  <DatePickerCustom
                    allowClear={false}
                    size="large"
                    format="DD/MM/YYYY"
                    name="startTime"
                    value={values.startTime}
                    disabledDate={current => {
                      return current && current <= moment().endOf("day");
                    }}
                    onChange={value =>
                      setFieldValue(
                        "startTime",
                        value === null ? undefined : value
                      )
                    }
                  />
                </FormItem>
              </Col>
              {/* <Col className={atHome && "px-1"} md={atHome ? 2 : 24}>
                <label
                  className={atHome ? "font-weight-bold text-white mb-0" : ""}
                >
                  Slot
                </label>
                <FormItem
                  className={atHome ? "mb-0" : ""}
                  validateStatus={touched.slot && errors.slot && "error"}
                  help={touched.slot && errors.slot}
                >
                  <InputNumberCustom
                    min={1}
                    max={10}
                    defaultValue={2}
                    size="large"
                    name="slot"
                    onChange={value => setFieldValue("slot", value)}
                  />
                </FormItem>
              </Col> */}
              <Col className={atHome ? "px-1" : ""} md={atHome ? 6 : 24}>
                {atHome ? (
                  <ButtonCustom
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                  >
                    <CarOutlined />
                    Search
                  </ButtonCustom>
                ) : (
                  <ButtonCustom
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                  >
                    <CarOutlined />
                    Search
                  </ButtonCustom>
                )}
              </Col>
            </Row>
          </form>
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    stations: state.stations
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     searchTrips: payload => {
//       dispatch(searchTrips(payload));
//     },
//     getProvinces: () => {
//       dispatch(getProvinces());
//     }
//   };
// };

export default withRouter(
  connect(mapStateToProps, stationActions)(BookingForm)
);
