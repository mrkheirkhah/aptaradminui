import Vue from "vue";
import App from "./App.vue";
import "core-js/stable";
import router from "./router";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "./assets/icons/icons.js";
import store from "./store/index";

Vue.config.performance = true;
Vue.use(CoreuiVue);
Vue.prototype.$log = console.log.bind(console);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  icons,
  render: (h) => h(App),
}).$mount("#app");
