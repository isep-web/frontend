// import Vue from 'vue';
import Vuex from "vuex";

// Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    userid: "",
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token.token); //存储token
    },
    setId(state, userid) {
      state.userid = userid;
    },
    delToken(state) {
      state.token = "";
      localStorage.removeItem("token"); //删除token
    },
  },
  getters: {
    userid: (state) => state.userid,
  },
});
