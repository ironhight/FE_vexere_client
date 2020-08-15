import React, { PureComponent } from "react";
import AvatarImg from "../../assets/images/user-ic.png";
import { Avatar, UploadAvatar } from "./styled";
import { Icon } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/users.action";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

class AvatarWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, file: null };
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.getAvatar(id);
  }

  onHandleAvatar = (e) => {
    let file = e.target.files[0];
    const formData = new FormData();
    const config = { headers: { "content-type": "multipart/form-data" } };

    formData.append("avatar", file);

    this.setState({ isLoading: true });
    this.props.updateAvatar(formData, config, () => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { avatar, fullName, isMyProfile = true } = this.props;
    const { isLoading } = this.state;

    return (
      <Avatar>
        <div className="text-center">
          {isMyProfile ? (
            <UploadAvatar isLoading={isLoading}>
              <label className="cursor-point mb-0">
                <img src={!avatar.avatar ? AvatarImg : avatar.avatar} alt="avatar" />
                <input className="d-none" type="file" onChange={this.onHandleAvatar} />
              </label>
              <div className="btn-upload">
                {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
              </div>
            </UploadAvatar>
          ) : (
            <UploadAvatar isLoading={isLoading}>
              <label className="cursor-point mb-0">
                <img src={!avatar.avatar ? AvatarImg : avatar.avatar} alt="avatar" />
              </label>
            </UploadAvatar>
          )}
          <h5 className="mb-0 name">{fullName}</h5>
        </div>
      </Avatar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    avatar: state.usersReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAvatar: (value, config, cb) => dispatch(userActions.updateAvatar(value, config, cb)),
    getAvatar: (id) => dispatch(userActions.getAvatar(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AvatarWrapper));
