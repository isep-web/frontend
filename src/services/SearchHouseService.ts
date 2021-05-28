import axios from "axios";

class SearchHouseService {
  retrieveAllHouses() {
    return axios.get("http://localhost:17698/houses");
  }
  retrieveAllHousesAmenities(amenityHref: any) {
    return axios.get(amenityHref);
  }
}

export default new SearchHouseService();
