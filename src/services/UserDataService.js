import axios from "@/request/http";

class UserDataService {
  retrieveAllUser(userId) {
    return axios.get("/users/" + userId);
  }

  patchuser(userId, form) {
    return axios.patch("/users/" + userId, form);
  }
  postuser(form) {
    return axios.post("/users", form);
  }
  authpost(form) {
    return axios.post("/auth", form);
  }
}

export default new UserDataService();
