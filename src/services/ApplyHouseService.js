import axios from "axios";

class ApplyHouseService {
  postApplication(form) {
    return axios.post("http://localhost:17698/applications", form);
  }
  postMessage(msgForm) {
    return axios.post("http://localhost:17698/messages", msgForm);
  }
  getMessage(msgForm) {
    return 0;
  }
}

export default new ApplyHouseService();
