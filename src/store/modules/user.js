import Vue from "vue";
export default {
  namespaced: true,
  state: {
    user: {
      login: "",
      password: "",
      email: "",
      role: "",
      firstName: "",
      lastName: "",
      id: "",
      avatar: "",
      phone: "",
      secondName: "",
      timeSettings: new Date().getTime(),
      detail: null,
      isVarifiedPhone: "",
      isVarifiedEmail: ""
    },
    profile: {},
    listenUser: "",
    error: false,
    timeSettings: new Date().getTime()
  },
  getters: {
    getToken(state, getters, rootState, rootGetters) {
      return rootGetters["auth/getToken"];
    },
    getTimeSettings(state) {
      return state.timeSettings;
    },
    getApiUri(state, getters, rootState, rootGetters) {
      return rootGetters["api/api"] + "user";
    },
    getUserDetail(state) {
      return state.user;
    },
    getUserProfile(state) {
      return state.profile;
    },
    getError(state) {
      return state.error;
    }
  },
  mutations: {
    setUserProfile(state, payload) {
      state.profile = payload.profile;
    },
    setUserDetails(state, payload) {
      if (payload.user) state.user = payload.user;
    },
    redactUserDetails(state, payload) {
      if (!payload.key) state.user[payload.option] = payload.data;
      else {
        state.user[payload.option] = { [payload.key]: payload.data };
      }
      //this.dispatch("user/saveSettings", state.user);
    },
    redactContactInfo(state, payload) {
      state.user.detail.userDetails[payload.index].value = payload.value;
    },
    clearUserData(state) {
      state.user = {
        login: "",
        password: "",
        email: "",
        role: "",
        firstName: "",
        lastName: "",
        id: "",
        avatar: "",
        timeSettings: 0
      };
    },
    setError(state, payload) {
      state.error = payload;
    },
    setListenUser(state, payload) {
      state.listenUser = payload;
    }
  },
  actions: {
    async saveSettings({ getters }) {
      let uri = getters["getApiUri"];
      if (getters["getApiUri"]) {
        await Vue.prototype.$http
          .put(uri, JSON.stringify(getters["getUserDetail"]), {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getters["getToken"]}`
            }
          })
          .then(() => {
            this.dispatch("user/getUserData", getters["getUserDetail"].login);
          });
      }
    },
    async getUserData({ commit, getters }, login) {
      let uri = getters["getApiUri"] + "?login=" + encodeURIComponent(login);
      if (getters["getApiUri"]) {
        await Vue.prototype.$http
          .get(uri, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getters["getToken"]}`
            }
          })
          .then(response => {
            commit("setUserDetails", response.data);
            commit("setUserProfile", response.data);
            if (response.data.profile)
              commit(
                "userSettings/setUserSettings",
                response.data.profile.uiSettings,
                {
                  root: true
                }
              );
            else {
              commit("userSettings/setUserSettings", null, {
                root: true
              });
            }
          })
          .catch(error => {
            commit("setError", error.response.status);
          });
      }
    }
  }
};
