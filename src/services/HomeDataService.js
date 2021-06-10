import axios from "@/request/http";
//const URL = "/houses";

class HomeDataService {
  //如果参数houseId 是-1， 返回所有houses的数据。
  retrieveAllHome(houseId) {
    if (houseId > -1) {
      return axios.get("/houses/" + houseId);
    } else {
      return axios.get("/houses/");
    }
  }
  retrieveAllAmenities(houseId) {
    return axios.get("/houses/" + houseId + "/amenities");
  }
  retrieveAllConstraints(houseId) {
    return axios.get("/houses/" + houseId + "/constraints");
  }
  retrieveAllServices(houseId) {
    return axios.get("/houses/" + houseId + "/services");
  }
  //获取用户userId申请的applications
  retrieveAllApps(userId) {
    return axios.get("/users/" + userId + "/sentApplications");
  }
  retrieveAllReservations(userId) {
    return axios.get("/users/" + userId + "/receivedApplications");
  }
  retrievePicByHouseId(houseId) {
    return axios.get("/houses/" + houseId + "/photos");
  }
  retrievePicByUserId(userId) {
    return axios.get("/users/" + userId + "/avatar");
  }

  getByLink(link) {
    return axios.get(link);
  }

  postHome(form) {
    return axios.post("/houses/", form);
  }
  putAmenities(houseId, data) {
    return axios.put("/houses/" + houseId + "/amenities", data);
  }
  putConstraints(houseId, data) {
    return axios.put("/houses/" + houseId + "/constraints", data);
  }
  putServices(houseId, data) {
    return axios.put("/houses/" + houseId + "/services", data);
  }

  putHouse(houseId, form) {
    return axios.put("/houses/" + houseId, form);
  }

  putHousePhotos(files) {
    // return axios.put("http://localhost:17698/houses" + houseId + "/photos", files);
    return axios.post("http://localhost:17698/pictures", files);
  }
  putPictureContent(picId, file) {
    let config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    return axios
      .post("/pictures/" + picId, file, config)
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
    return axios.delete("/houses/" + houseId);
  }
  deleteApp(appId) {
    return axios.delete("/applications/" + appId);
  }
  deletePic(picId) {
    axios.delete("/pictures/" + picId + "/content");
    return axios.delete("/pictures/" + picId, {
      headers: { Accept: "application/hal+json" },
    });
  }

  patchApp(appId, data) {
    return axios.patch("/applications/" + appId, data);
  }

  retrieveAllHouse() {
    return axios.get("/houses");
  }

  getPic(id) {
    return axios.get("/pictures/2", {
      responseType: "arraybuffer",
    });
  }
}

export default new HomeDataService();
