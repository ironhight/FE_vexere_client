import React, { Component } from "react";
import { connect } from "react-redux";
import * as tripActions from "../../redux/actions/trips";
import * as stationActions from "../../redux/actions/stations";
import * as usersAction from "../../redux/actions/users.action";

import { Steps, Button, message } from "antd";
import { StyledStep } from "./styled";
import ContentStep1 from "../../components/BookingTripStep1/Step1";

const { Step } = Steps;

class BookingTrip extends Component {
  constructor(props) {
    super(props);
    this.state = { current: 0 };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.props.getTripByID(id);
    this.props.getStations();
    this.props.getProfile();
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
    console.log(this.props.user);
    const { current } = this.state;
    console.log("Run render BookingTrip");
    const steps = [
      {
        title: "Chọn ghế",
        content: <ContentStep1 />,
      },
      {
        title: "Thanh toán",
        content: "Second-content",
      },
      {
        title: "Xác nhận",
        content: "Last-content",
      },
    ];

    return (
      <div className="container" style={{ margin: "20px auto" }}>
        <Steps current={current}>
          {steps.map((item) => (
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
              <Button type="primary" onClick={() => message.success("Processing complete!")}>
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

const mapStateToProps = (state) => {
  return {
    auth: state.Authenticate,
    user: state.usersReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTripByID: (id) => {
      dispatch(tripActions.getDetailTrip(id));
    },
    getStations: () => {
      dispatch(stationActions.getStations());
    },
    getProfile: () => {
      dispatch(usersAction.getProfileAdmin());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingTrip);
