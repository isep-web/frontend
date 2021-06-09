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
  //获取用户userId申请的applications
  retrieveAllApps(userId) {
    return axios.get(
      "http://localhost:17698/users/" + userId + "/sentApplications"
    );
  }
  retrieveAllReservations(userId) {
    return axios.get(
      "http://localhost:17698/users/" + userId + "/receivedApplications"
    );
  }
  retrievePicByHouseId(houseId) {
    return axios.get("http://localhost:17698/houses/" + houseId + "/photos");
  }

  getByLink(link) {
    return axios.get(link);
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

  putHousePhotos(houseId, files) {
    // return axios.put("http://localhost:17698/houses" + houseId + "/photos", files);
    return axios.post("http://localhost:17698/pictures", files);
  }
  putPictureContent(picId, file) {
    let config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    return axios
      .post("http://localhost:17698/pictures/" + picId, file, config)
      .then((res) => {
        if (res.data) {
          return Promise.resolve(res.data);
        } else {
          throw res;
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  deleteHouse(houseId) {
    return axios.delete("http://localhost:17698/houses/" + houseId);
  }
  deleteApp(appId) {
    return axios.delete("http://localhost:17698/applications/" + appId);
  }
  deletePic(picId) {
    axios.delete("http://localhost:17698/pictures/" + picId + "/content");
    return axios.delete("http://localhost:17698/pictures/" + picId, {
      headers: { Accept: "application/hal+json" },
    });
  }

  patchApp(appId, data) {
    return axios.patch("http://localhost:17698/applications/" + appId, data);
  }

  retrieveAllHouse() {
    return axios.get("http://localhost:17698/houses");
  }

  getPic(id) {
    return axios.get("http://localhost:17698/pictures/2", {
      responseType: "arraybuffer",
    });
  }
}

export default new HomeDataService();
