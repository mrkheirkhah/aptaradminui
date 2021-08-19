import Vue from "vue";
import App from "./App.vue";
import "core-js/stable";
import router from "./router";
import CoreuiVue from "@coreui/vue";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { iconsSet as icons } from "./assets/icons/icons.js";
import store from "./store/index";

Vue.config.performance = true;
Vue.use(CoreuiVue);
Vue.prototype.$log = console.log.bind(console);
Vue.config.productionTip = false;

import VuePersianDatetimePicker from "vue-persian-datetime-picker";
Vue.component("date-picker", VuePersianDatetimePicker);
Vue.use(VueLoading);

new Vue({
  router,
  store,
  icons,
  render: (h) => h(App),
}).$mount("#app");
