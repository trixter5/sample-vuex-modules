import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import api from "./api";
import auth from "./auth";
import reg from "./reg";
import user from "./user";
import brokers from "./brokers";

export const store = new Vuex.Store({
  modules: {
    api,
    auth,
    reg,
    user,
    brokers
  },
  strict: process.env.NODE_ENT !== "production"
});