import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import Axios from "axios";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");

const token = localStorage.getItem("token");
if (token) {
  store.commit("setToken", token);
}

localStorage.setItem("token", "123");

// Axios.interceptors.request.use(
//   (config) => {
//     if (localStorage.getItem("token")) {
//       config.headers.Authorization = localStorage.getItem("token");
//     }
//
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
