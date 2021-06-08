import axios from "axios";

class AdminService {
  getAllUsers() {
    return axios.get("http://localhost:17698/users");
  }
  getAllHousesOfOneUser(userId) {
    return axios.get(
      "http://localhost:17698/houses/search/findByUserId?id=" + userId
    );
  }
  deleteUser(userId) {
    return axios.delete("http://localhost:17698/users/" + userId);
  }
}

export default new AdminService();
