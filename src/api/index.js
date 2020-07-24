import axios from "axios";

let baseURL;

switch (process.env.REACT_ENV) {
  case "dev":
    baseURL = "http://localhost:6789/api";
    break;

  case "staging":
    baseURL = "https://fs07-vexere-nam.herokuapp.com";
    break;

  default:
    break;
}

const api = axios.create({ baseURL });

export default api;
