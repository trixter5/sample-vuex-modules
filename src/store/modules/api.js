export default {
  namespaced: true,
  state: {
    restApiUri: "https://api.site.com/api/",
    apiUri: "https://devApi.site.org/api/",
    emailUri: "https://noti.site.com/api/email",
    emailTTUrl: "https://noti.site.org/api/Email"
  },
  getters: {
    restApi(state) {
      return state.restApiUri;
    },
    api(state) {
      return state.apiUri;
    },
    emailApi(state) {
      return state.emailApi;
    },
    emailTTApi(state) {
      return state.emailTTUrl;
    }
  }
};
