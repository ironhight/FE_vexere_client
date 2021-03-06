import React, { PureComponent } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar, Menu, Dropdown } from "antd";

import Logo from "../../assets/images/logo.svg";
import { Navbar, Nav, NavItem, Collapse } from "reactstrap";
import { HeaderContainer } from "./styled";
import { FaUserPlus } from "react-icons/fa";

//core components
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

import { authLogout } from "../../redux/actions/auth";
import { getAvatar } from "../../redux/actions/users.action";

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      signInVisible: false,
      registerVisible: false,
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getAvatar(user._id);
  }

  loginModal = (value) => {
    this.setState({
      signInVisible: value,
      registerVisible: false,
    });
  };

  registerModal = (value) => {
    this.setState({
      registerVisible: value,
      signInVisible: false,
    });
  };

  render() {
    const { signInVisible, registerVisible } = this.state;
    const { auth, user } = this.props;

    const menu = (
      <Menu theme="dark">
        <Menu.Item>
          <p
            style={{
              color: "#fff",
              borderBottom: "1px solid #fff",
              paddingBottom: "8px",
            }}
            className="mb-0"
          >
            {auth.user.fullName}
          </p>
        </Menu.Item>
        <Menu.Item>
          <Link to="/edit-profile">Chỉnh sửa thông tin</Link>
        </Menu.Item>

        {/* <Menu.Item>
          <Link to="/history-trips">History trips</Link>
        </Menu.Item> */}

        <Menu.Item>
          <Link to="/my-profile">Thông tin của tôi</Link>
        </Menu.Item>

        <Menu.Item>
          <Link to="/" onClick={() => this.props.authLogout()}>
            Đăng xuất
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <HeaderContainer>
        <Navbar expand="md" className="container">
          <Link to="/" className="px-0 py-0 mr-0">
            <img className="logo" src={Logo} alt="logo" />
          </Link>
          <Collapse navbar>
            <Nav className="ml-auto align-items-center" navbar>
              {!auth.isAuthenticated ? (
                <>
                  <NavItem className="mr-3">
                    <p
                      className="login-link text-dark cursor-point mb-0"
                      onClick={() => this.loginModal(true)}
                    >
                      Đăng nhập
                    </p>
                    <LoginForm
                      registerModal={this.registerModal}
                      loginModal={this.loginModal}
                      signInVisible={signInVisible}
                    />
                  </NavItem>
                  <NavItem>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => this.registerModal(true)}
                    >
                      <FaUserPlus className="mr-1" />
                      Đăng ký
                    </button>
                    <RegisterForm
                      registerVisible={registerVisible}
                      loginModal={this.loginModal}
                      registerModal={this.registerModal}
                    />
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <Dropdown overlay={menu}>
                      {/* <Avatar icon="user"  /> */}
                      <Avatar src={user.avatar} className="cursor-point" />
                    </Dropdown>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </HeaderContainer>
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
    authLogout: () => {
      dispatch(authLogout());
    },
    getAvatar: (id) => {
      dispatch(getAvatar(id));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
