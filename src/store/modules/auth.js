import Vue from "vue";
export default {
  namespaced: true,
  state: {
    login: "",
    token: localStorage.getItem("TTCRMAdmin") || "",
    authError: "",
    timerRefreshToken: null
  },
  getters: {
    getAuthUri(state, getters, rootState, rootGetters) {
      return rootGetters["api/api"] + "auth";
    },
    getRefreshTokenUri(state, getters, rootState, rootGetters) {
      return rootGetters["api/api"] + "refreshtoken ";
    },
    getAuthError(state) {
      return state.authError;
    },
    getToken(state) {
      return state.token;
    },
    getTimer(state) {
      return state.timerRefreshToken;
    },
    getLogin(state) {
      return state.login;
    }
  },
  mutations: {
    setError(state, error) {
      state.authError = error;
    },
    setToken(state, token) {
      state.token = token;
    },
    setLogin(state, login) {
      state.login = login;
    },
    clearCreds(state) {
      state.token = "";
      state.login = "";
    }
  },
  actions: {
    async performLogin({ commit, getters }, payload) {
      await Vue.prototype.$http
        .post(getters["getAuthUri"], JSON.stringify(payload), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          window.localStorage.setItem("TTCRMAdmin", response.data.token);
          Vue.prototype.$http.defaults.headers.common['Authorization'] = response.data.token;
          commit("setError", "");
          commit("setToken", response.data.token);
          commit("setLogin", payload.username);
        })
        .catch(error => {
          commit("setError", error);
          window.localStorage.removeItem("TTCRMAdmin")
        });
    },
    exitAuth({ commit }) {
      commit("clearCreds");
      commit("user/clearUserData", null, { root: true });
      window.localStorage.removeItem("TTCRMAdmin");
      Vue.prototype.$http.defaults.headers.common['Authorization'] = "";
    }
  }
};
