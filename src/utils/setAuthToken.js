import api from "../api/index";

const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common["token"] = token;
  } else {
    delete api.defaults.headers.common["token"];
  }
};
export default setAuthToken;
