import axios from "axios";
//const URL = "http://localhost:17698/houses";

class UserDataService {
  retrieveAllUser() {
    return axios.get("http://localhost:17698/users/1");
  }

  patchuser(form) {
    return axios.patch("http://localhost:17698/users/1", form);
  }
  postuser(form) {
    return axios.post("http://localhost:17698/users", form);
  }
}

export default new UserDataService();
