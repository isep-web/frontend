import axios from "axios";

class ApplyHouseService {
  postApplication(form) {
    return axios.post("http://localhost:17698/applications", form);
  }
}

export default new ApplyHouseService();
