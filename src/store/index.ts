// import Vue from 'vue';
import Vuex from "vuex";

// Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userid: "",
    role: "",
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setId(state, userid) {
      state.userid = userid;
    },
    setRole(state, role) {
      state.role = role;
    },
    delToken(state) {
      state.token = "";
      state.userid = "";
      state.role = "";
    },
  },
  getters: {
    userid: (state) => state.userid,
  },
});
