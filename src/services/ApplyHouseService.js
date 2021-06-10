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
}

export default new ApplyHouseService();
