import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import ScrollToTop from "react-router-scroll-top";
import { connect } from "react-redux";

//core components
import Header from "./components/Header";
// import HomePage from "./components/HomePage";

import setAuthToken from "./utils/setAuthToken";

class App extends React.Component {
  constructor(props) {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp > new Date().getTime() / 1000) {
        setAuthToken(token);
      }
    }
    super(props);
    this.state = { isValid: false };
  }
  render() {
    const { auth } = this.props;
    const { isAuthenticated } = auth;
    return (
      <div className="App">
        <BrowserRouter>
          <ScrollToTop>
            <Header />
            {/* <HomePage /> */}
          </ScrollToTop>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, null)(App);
