export default {
  namespaced: true,
  state: {
    restApiUri: "https://api.iqquantum.com/api/",
    // devApiUri: "https://devapi.toptrader.org/api/",
    apiUri: "https://devApi.toptrader.org/api/",
    // apiUri: "https://api.toptrader.org/api/",
    emailUri: "https://noti.forexinvest.com/api/email",
    emailTTUrl: "https://noti.toptrader.org/api/Email"
  },
  getters: {
    restApi(state) {
      return state.restApiUri;
    },
    api(state) {
      return state.apiUri;
    },
    // devApi(state) {
    //   return state.devApiUri;
    // },
    emailApi(state) {
      return state.emailApi;
    },
    emailTTApi(state) {
      return state.emailTTUrl;
    }
  }
};
