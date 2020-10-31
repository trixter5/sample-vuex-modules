import Vue from "vue";

export default {
  namespaced: true,
  state: {
    brokers: []
  },
  getters: {
    getApiUrl(state, getters, rootState, rootGetters) {
      return rootGetters["api/api"] + "ExternalPartner/GetPartnerInfo?Status=Created";
    },
    getApiApproved(state, getters, rootState, rootGetters) {
      return rootGetters["api/api"] + "ExternalPartner/GetPartnerInfo?Status=Approved";
    },
    getApiSave(state, getters, rootState, rootGetters) {
      return rootGetters["api/api"] + "ExternalPartner/SavePartnerInfo";
    },
    getBrokers(state) {
      return state.brokers;
    },
    getToken(rootGetters) {
      return rootGetters["auth/getToken"];
    }
  },
  mutations: {
    setBrokers(state, payload) {
      state.brokers = payload;
    },
    setBrokerStatus(state, payload) {
      const el = state.brokers.find(el => el.id === payload.id);
      const id = state.brokers.indexOf(el);
      Vue.set(state.brokers[id], "status", payload.status);
    }
  },
  actions: {
    async getListBrokers(store) {
      await Vue.prototype.$http
        .get(store.getters["getApiUrl"])
        .then(response => {
          store.commit("setBrokers", response.data);
        }).catch(err => {
          console.log(err);
      })
    },
    async changeBrokerStatus(store, payload) {
      let broker;
      broker = store.getters.getBrokers.find(el => el.id === payload.id);
      let brokerObj = {
        "id": payload.id,
        "userId": broker.userId,
        "company": broker.company,
        "country": broker.country,
        "lisence": broker.lisence,
        "site": broker.site,
        "email": broker.email,
        "phone": broker.phone,
        "agentName": broker.agentName,
        "agentPhone": broker.agentPhone,
        "updatedDateTime": new Date(),
        "status": payload.status
      };

      console.log("v", brokerObj, store.getters.getToken);

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      await Vue.prototype.$http
        .post(store.getters["getApiSave"], brokerObj, config)
          .then(response => {
            window.console.log("Broker Status updated", response);
            store.commit("setBrokerStatus", payload)
          }).catch(err => {
            console.log(err)
      })
    }
  }
};
