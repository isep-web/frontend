import axios from "axios";
import { ElMessage } from "element-plus";
import store from "@/store/index.ts";
import router from "@/router";

axios.defaults.baseURL = "http://localhost:8888";
axios.defaults.timeout = 10000;

const instance = axios.create({ timeout: 1000 * 12 });

instance.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    token && (config.headers.Authorization = "Bearer " + token);
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  // 20x status
  (res) =>
    res.status === 200 ||
    res.status === 201 ||
    res.status === 202 ||
    res.status === 203 ||
    res.status === 204
      ? Promise.resolve(res)
      : Promise.reject(res),
  // rejected
  (error) => {
    const { response } = error;
    if (response) {
      // other status
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      return Promise.reject(error);
    }
  }
);
/**
 * Error message
 */
const elMsg = (msg: string) => {
  ElMessage({
    message: msg,
    duration: 1000,
    type: "error",
    showClose: true,
  });
};

/**
 * Handle response error
 * @param {Number} status status code
 * @param other console message
 */
const errorHandle = (status: number, other: string) => {
  switch (status) {
    // 401
    case 401:
      toLogin();
      break;
    // auth error
    case 5002:
    case 5003:
      elMsg("Token is invalid, please login again");
      localStorage.removeItem("token");
      store.commit("setToken", null);
      setTimeout(() => {
        toLogin();
      }, 2000);
      break;
    // 404
    case 404:
      // elMsg("Requested resource does not exist");
      break;
    default:
      console.log(other);
  }
};

const toLogin = () => {
  router.replace({
    path: "/login",
    query: {
      redirect: router.currentRoute.value.fullPath,
    },
  });
};

export default instance;
