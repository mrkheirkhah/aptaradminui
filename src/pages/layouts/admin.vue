<template>
  <div class="c-app">
    <TheSidebar />
    <CWrapper>
      <TheHeader />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade" mode="out-in">
              <router-view :key="$route.path"></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
      <TheFooter />
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from "../../components/base/TheSidebar.vue";
import TheHeader from "../../components/base/TheHeader.vue";
import TheFooter from "../../components/base/TheFooter.vue";
export default {
  name: "AdminLAyout",
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
  },
  methods: {
    fetchBaseInfo() {
      this.$store.dispatch("fetchBaseInfo", null, { root: true });
    },
  },
  mounted() {
    this.fetchBaseInfo();
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

option {
  font-family: "shabnam" !important;
}
</style>