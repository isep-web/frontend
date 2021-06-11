import axios from "@/request/http";

class ApplyHouseService {
  postApplication(form) {
    return axios.post("/applications", form);
  }
  postMessage(msgForm) {
    return axios.post("/messages", msgForm);
  }
  getUser(userId) {
    return axios.get("/users/" + userId);
  }
  getMessageByTargetId(targetUserId) {
    console.log("/messages/search/findByTargetUserId?userId=" + targetUserId);
    return axios.get(
      "/messages/search/findByTargetUserId?userId=" + targetUserId
    );
  }
  getMessageBySourceId(sourceUserId) {
    return axios.get(
      "/messages/search/findBySourceUserId?userId=" + sourceUserId
    );
  }
  patchMessageReadStatus(msgId) {
    return axios.patch("/messages/" + msgId, JSON.parse('{"read":1}'));
  }
}

export default new ApplyHouseService();
