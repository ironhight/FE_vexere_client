import axios from "axios";
let baseURL;

switch (process.env.NODE_ENV) {
  case "dev":
    baseURL = "http://localhost:6789/api";
    break;

  case "production":
    baseURL = "https://fs07-vexere-nam.herokuapp.com/api";
    break;

  default:
    break;
}

const api = axios.create({ baseURL });

export default api;
