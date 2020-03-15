import React, { Component } from "react";
import { connect } from "react-redux";
// import _ from "lodash";
// import { getDetailTrip } from "../../redux/actions/trips";
// import { getStations } from "../../redux/actions/stations";

import * as tripActions from "../../redux/actions/trips";
import * as stationActions from "../../redux/actions/stations";

import { Steps, Button, message } from "antd";
import { StyledStep } from "./styled";
import ContentStep1 from "../../components/BookingTripStep1/Step1";

const { Step } = Steps;

class BookingTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    // console.log("BookingTrip -> componentDidMount -> id", id);
    this.props.getTripByID(id);
    this.props.getStations();
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    // const { stations, trips } = this.props;
    const { current } = this.state;
    console.log("Run render BookingTrip");
    const steps = [
      {
        title: "Chọn ghế",
        content: <ContentStep1 />
      },
      {
        title: "Thanh toán",
        content: "Second-content"
      },
      {
        title: "Xác nhận",
        content: "Last-content"
      }
    ];

    return (
      <div className="container" style={{ margin: "20px auto" }}>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <StyledStep>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </StyledStep>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTripByID: id => {
      dispatch(tripActions.getDetailTrip(id));
    },
    getStations: () => {
      dispatch(stationActions.getStations());
    }
  };
};

export default connect(null, mapDispatchToProps)(BookingTrip);
