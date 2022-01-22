<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        {{
          $store.state.adminUser.UserName ||
            usernameInLocalStorage() ||
            "No User"
        }}
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>حساب ادمین</strong>
    </CDropdownHeader>
    <!-- <CDropdownItem>
      <CIcon name="cil-bell" /> Updates
      <CBadge color="info" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-envelope-open" /> Messages
      <CBadge color="success" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem> -->
    <CDropdownItem to="/admin/change-password">
      <CIcon class="ml-3 mr-0" name="cil-lock-locked" /> تغییر رمز عبور
    </CDropdownItem>
    <CDropdownItem @click="logout">
      <CIcon class="ml-3 mr-0" name="cil-exit-to-app" />
      خروج
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      itemsCount: 42,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem(process.env.VUE_APP_ENV_APPLICATION_TOKEN_KEY);
      localStorage.removeItem("username");
      window.location.reload();
    },
    usernameInLocalStorage() {
      return localStorage.getItem("username");
    },
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>
