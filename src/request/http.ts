import axios from "axios";
// import qs from "qs";
import { ElMessage } from "element-plus";
import store from "@/store/index.ts";
import router from "@/router";
// import { ConsoleMessage } from "inspector";

axios.defaults.baseURL = "http://localhost:17698";
axios.defaults.timeout = 10000;

const instance = axios.create({ timeout: 1000 * 12 });

instance.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    // console.log("1: " + token);
    token && (config.headers.Authorization = "Bearer " + token);
    return config;
  },
  (error) => Promise.reject(error)
);
// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (res) => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  // 请求失败
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
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
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 5002:
    case 5003:
      elMsg("Token is invalid, please login again");
      localStorage.removeItem("token");
      store.commit("setToken", null);
      setTimeout(() => {
        toLogin();
      }, 2000);
      break;
    // 404请求不存在
    case 404:
      elMsg("Requested resource does not exist");
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
