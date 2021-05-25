import axios from "axios";
//const URL = "http://localhost:17698/houses";

class HomeDataService {
  retrieveAllHome() {
    return axios.get("http://localhost:17698/houses/1");
  }
}

export default new HomeDataService();
