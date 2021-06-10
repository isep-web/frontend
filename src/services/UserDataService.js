import axios from "axios";

class UserDataService {
  retrieveAllUser(userId) {
    return axios.get("http://localhost:17698/users/" + userId);
  }

  patchuser(userId, form) {
    return axios.patch("http://localhost:17698/users/" + userId, form);
  }
  postuser(form) {
    return axios.post("http://localhost:17698/users", form);
  }
  authpost(form) {
    return axios.post("http://localhost:17698/auth", form);
  }
}

export default new UserDataService();
