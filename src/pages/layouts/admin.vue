<template>
  <div class="c-app">
    <TheSidebar class="sidebar" />
    <CWrapper>
      <TheHeader class="header" />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <router-view v-slot="{ Component }">
              <keep-alive>
                <transition name="fade" mode="out-in">
                  <component :is="Component" />
                </transition>
              </keep-alive>
            </router-view>
          </CContainer>
        </main>
      </div>
      <TheFooter class="footer" />
      <TheConfirmationModal />
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from "../../components/base/TheSidebar.vue";
import TheHeader from "../../components/base/TheHeader.vue";
import TheFooter from "../../components/base/TheFooter.vue";
import TheConfirmationModal from "../../components/base/TheConfirmationModal.vue";
export default {
  name: "AdminLAyout",
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
    TheConfirmationModal,
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

@media print {
  .hidden-print,
  .header,
  .footer,
  .sidebar {
    display: none;
    visibility: hidden;
  }

  @page {
    size: landscape;
  }
  body {
    writing-mode: tb-rl;
  }
}
</style>
