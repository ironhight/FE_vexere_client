import React, { PureComponent } from "react";
import { Section } from "./styled";
import TripItem from "./TripItem/TripItem";
import { Button, Skeleton } from "antd";
import { connect } from "react-redux";

import * as tripsActions from "../../redux/actions/trips";
// import { getTrips } from "../../services/Trip/actions";
// import { countTrips } from "../../services/CountTrip/actions";

class Trips extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      limit: 2
    };
  }

  componentDidMount() {
    this.props.getTrips(this.state.limit);
    this.props.getAllTrips();
  }

  loadMore = () => {
    let { limit } = this.state;

    this.setState(
      {
        limit: limit + 2
      },
      () => {
        this.props.getTrips(this.state.limit);
      }
    );
  };

  render() {
    const { user, trips, totalTrips } = this.props;
    const { limit } = this.state;
    const { data, isLoading } = trips;
    let count = totalTrips.length;
    console.log(data);
    return (
      <Section>
        <h2 className="text-center mb-5">Trip Booking</h2>
        <Skeleton active loading={isLoading}>
          <TripItem
            userType={user.user.userType}
            trips={data}
            large
            priceFont="30px"
          />
        </Skeleton>
        {limit < count && (
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

const mapStateToProps = state => {
  return {
    user: state.Authenticate,
    trips: state.trips,
    totalTrips: state.countTrips
  };
};

export default connect(mapStateToProps, tripsActions)(Trips);
