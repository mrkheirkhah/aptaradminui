<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="p-4">
            <CCardBody style="max-height: calc(100vh - 240px); overflow: auto">
              <CForm class="text-right" @submit.prevent="login">
                <h1>ورود</h1>
                <p class="text-muted">ورود به پنل ادمین</p>
                <CInput
                  placeholder="نام کاربری"
                  v-model="username"
                  :isValid="validateusername"
                  autocomplete="username email"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="رمزعبور"
                  type="password"
                  :isValid="validatepassword"
                  autocomplete="curent-password"
                  v-model="password"
                >
                  <template #prepend-content
                    ><CIcon name="cil-lock-locked"
                  /></template>
                </CInput>
                <CRow>
                  <CCol col="12" class="text-center">
                    <CButton type="submit" color="primary" class="px-4">
                      <CSpinner
                        class="ml-2"
                        v-if="requestInProgress"
                        size="sm"
                      />ورود</CButton
                    >
                  </CCol>
                </CRow>
                <CRow v-if="errText">
                  <CCol col="12" class="text-center mt-4 text-danger">{{
                    errText
                  }}</CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { Login } from "../services/auth";
export default {
  name: "Login",
  data() {
    return {
      requestInProgress: false,
      username: "",
      password: "",
      errText: null,
    };
  },
  methods: {
    validatepassword() {
      return this.password !== "";
    },
    validateusername() {
      return this.username !== "";
    },
    async login() {
      const self = this;
      if (!this.validatepassword || !this.validateusername) return;
      this.requestInProgress = true;
      try {
        const { data } = await Login({
          username: this.username,
          password: this.password,
        });
        if (data.token) {
          localStorage.setItem(
            process.env.VUE_APP_ENV_APPLICATION_TOKEN_KEY,
            data.token
          );
          localStorage.setItem("username", this.username);
          this.$store.dispatch("setAdminInfo", data, { root: true });
          if (self.$route.query.redirect) {
            return setTimeout(
              () => this.$router.push({ path: self.$route.query.redirect }),
              500
            );
          }
          setTimeout(() => this.$router.push({ name: "adminDashboard" }), 500);
        }
      } catch (ex) {
        this.errText = ex;
        console.log(ex);
      }
      this.username = "";
      this.password = "";
      this.requestInProgress = false;
    },
  },
};
</script>
