import Vue from "vue";
export default {
  namespaced: true,
  state: {
    userId: "",
    errorsReg: {
      errorEmail: false,
      errorLogin: false
    },
    statusSucces: false,
    regLogin: "",
    regPass: ""
  },
  getters: {
    getRegUri(state, getters, rootState, rootGetters) {
      return rootGetters["api/api"] + "user";
    },
    getError(state) {
      return state.errorsReg;
    },
    getUserId(state) {
      return state.userId;
    },
    getStatus(state) {
      return state.statusSucces;
    },
    getRegLogin(state) {
      return state.regLogin;
    },
    getRegPass(state) {
      return state.regPass;
    }
  },
  mutations: {
    setErrors(state, payload) {
      state.errorsReg.errorEmail = payload.emailExist;
      state.errorsReg.errorLogin = payload.loginExist;
    },
    setUserId(state, payload) {
      state.userId = payload;
    },
    setStatus(state, payload) {
      state.statusSucces = payload;
    },
    setRegLogin(state, payload) {
      state.regLogin = payload;
    },
    setRegPass(state, payload) {
      state.regPass = payload;
    }
  },
  actions: {
    async registartion(store, payload) {
      await Vue.prototype.$http
        .post(store.getters["getRegUri"], JSON.stringify(payload), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(() => {
          let clearError = {
            emailExist: false,
            loginExist: false
          };
          store.commit("setRegLogin", payload.login);
          store.commit("setRegPass", payload.password);
          store.commit("setErrors", clearError);
          store.commit("setStatus", true);
        })
        .catch(error => {
          window.console.log(error.response.data);
          if (error.response.data.existCredentials) {
            let errorMessge = error.response.data.existCredentials;
            store.commit("setErrors", errorMessge);
            store.commit("setStatus", false);
          }
        });
    }
  }
};
