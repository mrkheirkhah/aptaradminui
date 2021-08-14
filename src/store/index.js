import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  adminUser: {},
  alerts: [],
};

const getters = {
  getAlerts(state) {
    return state.alerts;
  },
};

const mutations = {
  SET_ADMIN_USER(state, adminInfo) {
    state.adminUser = adminInfo;
  },
  ADD_NEW_ALERT(state, alertObj) {
    state.alerts.push(alertObj);
  },
  REMOVE_ALERT(state, alertObj) {
    state.alerts.splice(
      state.alerts.findIndex((obj) => obj.messageBody === alertObj.messageBody),
      1
    );
  },
};

const actions = {
  setAdminInfo({ commit }, adminInfo) {
    commit("SET_ADMIN_USER", adminInfo);
  },
  addAlert({ commit }, alertObj) {
    commit("ADD_NEW_ALERT", alertObj);
    if (alertObj.autoHide) {
      setTimeout(() => {
        commit("REMOVE_ALERT", alertObj);
      }, alertObj.timeout);
    }
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
