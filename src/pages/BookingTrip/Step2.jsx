import React, { Component } from "react";
import { connect } from "react-redux";

class Step2 extends Component {
  render() {
    const { user, trips, seats } = this.props;
    return (
      <div>
        <h3>Thông tin vé đã chọn</h3>
        <p>Họ và tên: {user?.user?.fullName}</p>
        <p>Email: {user?.user?.email}</p>
        <p>Số điện thoại: {user?.user?.phoneNumber}</p>
        <p>Nơi xuất phát: {`${trips?.fromStation?.name}, ${trips?.fromStation.province}`}</p>
        <p>Điểm đến: {`${trips?.toStation?.name}, ${trips?.toStation.province}`}</p>
        <p>Ghế ngồi: {seats?.seatBook.toString()}</p>
        <p>Tổng tiền: {trips?.price * seats?.seatBook.length} vnđ</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer,
    trips: state.trips,
    seats: state.seatsReducers,
  };
};

export default connect(mapStateToProps, null)(Step2);
