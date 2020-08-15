import React, { PureComponent } from "react";
import { Skeleton } from "antd";
import { getProfileAdmin } from "../../redux/actions/users.action";
import { Wrapper, BodyWrapper } from "../../styled";
import PersonalForm from "../../components/Profile/PersonalForm";
import PasswordForm from "../../components/Profile/PasswordForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

class EditProfile extends PureComponent {
  componentDidMount() {
    const { auth, getProfileAdmin } = this.props;
    getProfileAdmin(auth.user._id);
  }

  render() {
    const { userInfo } = this.props;
    const { user } = userInfo;
    return (
      <div className="container">
        <BodyWrapper>
          <div className="col-9">
            <Wrapper>
              <h5 className="font-weight-normal d-flex align-items-center mb-4">
                <UserOutlined className="mr-1" />
                Thông tin cá nhân
              </h5>
              <Skeleton loading={user.isLoading} active paragraph={{ rows: 6 }}>
                <PersonalForm
                  email={user.email}
                  fullName={user.fullName}
                  dayOfBirth={user.dayOfBirth}
                  phoneNumber={user.phoneNumber}
                  id={user._id}
                  isLoading={user.isLoading}
                />
              </Skeleton>
              <h5 className="font-weight-normal d-flex align-items-center mb-4 mt-5">
                <LockOutlined className="mr-1" />
                Thay đổi mật khẩu
              </h5>
              <Skeleton loading={user.isLoading} active paragraph={{ rows: 6 }}>
                <PasswordForm id={user._id} />
              </Skeleton>
            </Wrapper>
          </div>
        </BodyWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.Authenticate,
    userInfo: state.usersReducer,
  };
};
export default connect(mapStateToProps, { getProfileAdmin })(withRouter(EditProfile));
