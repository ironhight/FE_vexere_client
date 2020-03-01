import React, { PureComponent } from "react";
import { Section } from "./styled";
import TripItem from "./TripItem/TripItem";
import { Button, Skeleton } from "antd";
import { connect } from "react-redux";

import * as tripsActions from "../../redux/actions/trips";

class Trips extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      limit: 2
    };
  }

  componentDidMount() {
    this.props.getTripsLimit(this.state.limit); //get trip limit de hien thi
    this.props.getAllTrips(); //tinh tong trip
  }

  loadMore = () => {
    let { limit } = this.state;
    console.log("run loadMore");
    this.setState(
      {
        limit: limit + 2
      },
      () => {
        this.props.getTripsLimit(this.state.limit);
      }
    );
  };

  render() {
    console.log("run render Trips");
    const { countTrips } = this.props;
    const { limit } = this.state;

    // let isLoading = countTrips ? false : true;
    return (
      <Section>
        <h2 className="text-center mb-5">Trip Booking</h2>
        <Skeleton acitve loading={false}>
          <TripItem />
        </Skeleton>

        {limit < countTrips && (
          <div className="text-center mt-3">
            <Button onClick={this.loadMore} type="dashed" size="large">
              Load more
            </Button>
          </div>
        )}
      </Section>
    );
  }
}

//countTrips la getAllTrip tu do tinh duoc length cua trip
const mapStateToProps = state => {
  return {
    countTrips: state.countTrips
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTripsLimit: limit => {
      dispatch(tripsActions.getTripsLimit(limit));
    },
    getAllTrips: () => {
      dispatch(tripsActions.getAllTrips());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trips);
