import axios from "axios";
//const URL = "http://localhost:17698/houses";

class HomeDataService {
  retrieveAllHome(houseId) {
    return axios.get("http://localhost:17698/houses/" + houseId);
  }
  retrieveAllAmenities(houseId) {
    return axios.get("http://localhost:17698/houses/" + houseId + "/amenities");
  }
  retrieveAllConstraints(houseId) {
    return axios.get(
      "http://localhost:17698/houses/" + houseId + "/constraints"
    );
  }
  retrieveAllServices(houseId) {
    return axios.get("http://localhost:17698/houses/" + houseId + "/services");
  }

  postHome(form) {
    return axios.post("http://localhost:17698/houses/", form);
  }
  postAmenities(houseId) {
    return axios.post();
  }
}

export default new HomeDataService();
