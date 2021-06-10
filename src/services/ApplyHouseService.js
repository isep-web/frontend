import axios from "@/request/http";

class ApplyHouseService {
  postApplication(form) {
    return axios.post("/applications", form);
  }
  postMessage(msgForm) {
    return axios.post("/messages", msgForm);
  }
  getMessage(msgForm) {
    return 0;
  }
  getUser(userId) {
    return axios.get("http://localhost:17698/users/" + userId);
  }
}

export default new ApplyHouseService();
