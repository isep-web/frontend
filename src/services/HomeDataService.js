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

  postHome(form) {
    return axios.post("http://localhost:17698/houses/", form);
  }
  putAmenities(houseId, array) {
    if (array.length < 1) {
      return;
    }
    let form = "{\n" + '  "_links": {';

    for (let i = 0; i < array.length; i++) {
      if (i !== 0) {
        form = form + ",";
      }
      form =
        form +
        '"' +
        array[i] +
        '": { "href": "http://localhost:17698/houses/' +
        houseId +
        "/amenities/" +
        array[i].slice(1) +
        '" }\n';
    }
    form = form + "}}";
    console.log(form);
    return axios.put(
      "http://localhost:17698/houses/" + houseId + "/amenities",
      form
    );

    // return axios.put("http://localhost:17698/houses/15/amenities", '{"_links": {"a1": { "href": "http://localhost:17698/houses/15/amenities/1" },"a2": { "href": "http://localhost:17698/houses/15/amenities/2" },"a8": { "href": "http://localhost:17698/houses/15/amenities/8" }}}');
  }
  putHouse(houseId, form) {
    return axios.put("http://localhost:17698/houses/" + houseId, form);
  }

  deleteHouse(houseId) {
    return axios.delete("http://localhost:17698/houses/" + houseId);
  }
}

export default new HomeDataService();
