import axios from "axios";

class SearchResultService {
  retrieveAllHouses() {
    return axios.get("http://localhost:17698/houses");
  }
}

export default new SearchResultService();
