import Vue from "vue";
import Vuex from "vuex";
import person from "./modules/person";
Vue.use(Vuex);

import { getStates } from "../services/base";

const state = {
  sidebarShow: "responsive",
  sidebarMinimize: true,
  adminUser: {},
  alerts: [],
  statesArray: [],
};

const getters = {
  getAlerts(state) {
    return state.alerts;
  },
};

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarOpened ? false : "responsive";
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarClosed ? true : "responsive";
  },
  set(state, [variable, value]) {
    state[variable] = value;
  },
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
  SET_STATES(state, data) {
    state.statesArray = data;
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
  async fetchStates({ commit }) {
    const { data } = await getStates();
    commit("SET_STATES", data);
  },
  async fetchBaseInfo({ dispatch }) {
    dispatch("fetchStates", null, { root: true });
  },
};

export default new Vuex.Store({
  modules: [person],
  state,
  getters,
  mutations,
  actions,
});
