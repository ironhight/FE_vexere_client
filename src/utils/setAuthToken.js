import api from "../api/index";

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = token;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
