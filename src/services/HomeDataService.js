import axios from "axios";
//const URL = "http://localhost:17698/houses";

class HomeDataService {
  //如果参数houseId 是-1， 返回所有houses的数据。
  retrieveAllHome(houseId) {
    if (houseId > -1) {
      return axios.get("http://localhost:17698/houses/" + houseId);
    } else {
      return axios.get("http://localhost:17698/houses/");
    }
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
  retrieveAllApplications(houseId) {
    return;
  }

  postHome(form) {
    return axios.post("http://localhost:17698/houses/", form);
  }
  putAmenities(houseId, data) {
    return axios.put(
      "http://localhost:17698/houses/" + houseId + "/amenities",
      data
    );
  }
  putConstraints(houseId, data) {
    return axios.put(
      "http://localhost:17698/houses/" + houseId + "/constraints",
      data
    );
  }
  putServices(houseId, data) {
    return axios.put(
      "http://localhost:17698/houses/" + houseId + "/services",
      data
    );
  }

  putHouse(houseId, form) {
    return axios.put("http://localhost:17698/houses/" + houseId, form);
  }

  deleteHouse(houseId) {
    return axios.delete("http://localhost:17698/houses/" + houseId);
  }
}

export default new HomeDataService();
