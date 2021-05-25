import axios from "axios";

class SearchResultService {
  retrieveAllHouses() {
    return axios.get("http://localhost:9090/houses");
  }
}

export default new SearchResultService();
