<template>
  <div id="app">
    <CToaster position="top-left">
      <template v-for="(message, index) in alerts">
        <CToast
          :key="'toast' + index"
          :show="true"
          :header="message.messageHeader"
          :color="message.type"
        >
          {{ message.messageBody }}
        </CToast>
      </template>
    </CToaster>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import "./assets/styles/font-shabnam.css";
export default {
  name: "App",
  computed: {
    ...mapGetters({
      alerts: "getAlerts",
    }),
  },
  created() {
    let htmlEl = document.querySelector("html");
    htmlEl.setAttribute("dir", "rtl");
    htmlEl.setAttribute("lang", "fa");
  },
};
</script>

<style lang="scss">
@import "assets/scss/style";
</style>
