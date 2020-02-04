import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { ThemeProvider } from "styled-components";

import theme from "./theme";
import "./index.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducers from "./services/reducers.js";
const initialState = {};
const middlwwares = [thunk];

const store = createStore(
  rootReducers,
  initialState,
  compose(
    applyMiddleware(...middlwwares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
