import Vue from "vue";
import Vuex from "vuex";
import person from "./modules/person";
Vue.use(Vuex);

import { getStates } from "../services/base";
import * as server from "../services/server";
import * as category from "../services/category";
import * as optionType from "../services/option/type";
import * as subscriptionType from "../services/subscription/type";
import * as subscription from "../services/subscription";
import * as product from "../services/product";
import * as payType from "../services/pay/type";
import * as option from "../services/option/index";
import * as productImage from "../services/product/images";

const state = {
  sidebarShow: "responsive",
  sidebarMinimize: true,
  adminUser: {},
  alerts: [],
  statesArray: [],
  serversArray: [],
  categoriesArray: [],
  optionTypesArray: [],
  subscriptionTypesArray: [],
  payTypesArray: [],
  subscriptionsArray: [],
  productsArray: [],
  optionsArray: [],
  productImageTypesArray: [],
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
    state.statesArray = data.sort((a, b) =>
      a.title > b.title ? 1 : b.title > a.title ? -1 : 0
    );
  },
  SET_SERVERS(state, data) {
    state.serversArray = data;
  },
  SET_CATEGORIES(state, data) {
    state.categoriesArray = data;
  },
  SET_OPTION_TYPES(state, data) {
    state.optionTypesArray = data;
  },
  SET_SUBSCRIPTION_TYPES(state, data) {
    state.subscriptionTypesArray = data;
  },
  SET_PAY_TYPES(state, data) {
    state.payTypesArray = data;
  },
  SET_SUBSCRIPTIONS(state, data) {
    state.subscriptionsArray = data;
  },
  SET_PRODUCTS(state, data) {
    state.productsArray = data;
  },
  SET_OPTIONS(state, data) {
    state.optionsArray = data;
  },
  SET_PRODUCT_IMAGE_TYPES(state, data) {
    state.productImageTypesArray = data;
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
  async fetchServers({ commit }) {
    const { data } = await server.catalog();
    commit("SET_SERVERS", data);
  },
  async fetchCategories({ commit }) {
    const { data } = await category.catalog();
    commit("SET_CATEGORIES", data);
  },
  async fetchOptionTypes({ commit }) {
    const { data } = await optionType.catalog();
    commit("SET_OPTION_TYPES", data);
  },
  async fetchSubscriptionTypes({ commit }) {
    const { data } = await subscriptionType.catalog();
    commit("SET_SUBSCRIPTION_TYPES", data);
  },
  async fetchPayTypes({ commit }) {
    const { data } = await payType.catalog();
    commit("SET_PAY_TYPES", data);
  },
  async fetchSubscriptions({ commit }) {
    const { data } = await subscription.catalog();
    commit("SET_SUBSCRIPTIONS", data);
  },
  async fetchProducts({ commit }) {
    const { data } = await product.catalog();
    commit("SET_PRODUCTS", data);
  },
  async fetchOptions({ commit }) {
    const { data } = await option.catalog();
    commit("SET_OPTIONS", data);
  },
  async fetchProductImageTypes({ commit }) {
    const { data } = await productImage.catalog();
    commit("SET_PRODUCT_IMAGE_TYPES", data);
  },
  async fetchBaseInfo({ dispatch }) {
    dispatch("fetchStates", null, { root: true });
    dispatch("fetchServers", null, { root: true });
    dispatch("fetchCategories", null, { root: true });
    dispatch("fetchOptionTypes", null, { root: true });
    dispatch("fetchSubscriptionTypes", null, { root: true });
    dispatch("fetchPayTypes", null, { root: true });
    dispatch("fetchSubscriptions", null, { root: true });
    dispatch("fetchProducts", null, { root: true });
    dispatch("fetchOptions", null, { root: true });
    dispatch("fetchProductImageTypes", null, { root: true });
  },
};

export default new Vuex.Store({
  modules: [person],
  state,
  getters,
  mutations,
  actions,
});
