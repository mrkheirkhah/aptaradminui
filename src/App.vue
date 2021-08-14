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
export default {
  name: "App",
  computed: {
    ...mapGetters({
      alerts: "getAlerts",
    }),
  },
};
</script>

<style lang="scss">
@import "assets/scss/style";

body {
  direction: rtl;
}
</style>
