import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import ScrollToTop from "react-router-scroll-top";

//core components
import Header from "./components/Header";
import Footer from "./components/Footer";
import { routesHome } from "./routes";

import setAuthToken from "./utils/setAuthToken";

function App() {
  const token = localStorage.getItem("Authorization");
  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.exp > new Date().getTime() / 1000) {
      setAuthToken(token);
    }
  }

  const showMenuHome = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return <Route key={index} path={item.path} exact={item.exact} component={item.component} />;
      });
    }
  };

  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Header />
          <Switch>{showMenuHome(routesHome)}</Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}

export default App;
