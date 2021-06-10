import axios from "axios";
// import qs from "qs";
import { ElMessage } from "element-plus";
import store from "@/store/index.ts";
import router from "@/router";

axios.defaults.baseURL = "http://localhost:17698";
axios.defaults.timeout = 10000;

const instance = axios.create({ timeout: 1000 * 12 });

instance.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    console.log("1: " + token);
    token && (config.headers.Authorization = "Bearer " + token);
    return config;
  },
  (error) => Promise.error(error)
);
axios.interceptors.response.use(
  (response) => {
    console.log(response.toString());
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: "/login",
          });
          break;

        case 5002:
          ElMessage({
            showClose: true,
            message: "登录过期，请重新登录",
            duration: 1000,
            type: "error",
          });
          setTimeout(() => {
            router.replace({
              path: "/login",
            });
          }, 1000);
          break;

        case 404:
          ElMessage({
            showClose: true,
            message: "Request does not exist",
            duration: 1000,
            type: "error",
          });
          break;
        default:
          ElMessage({
            showClose: true,
            message: error.response.data.message,
            duration: 1000,
            type: "error",
          });
      }
      return Promise.reject(error.response);
    }
  }
);

export default instance;
