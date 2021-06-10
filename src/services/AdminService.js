import axios from "@/request/http";

class AdminService {
  getAllUsers() {
    return axios.get("/users");
  }
  getAllHousesOfOneUser(userId) {
    return axios.get("/houses/search/findByUserId?id=" + userId);
  }
  deleteUser(userId) {
    return axios.delete("/users/" + userId);
  }
}

export default new AdminService();
