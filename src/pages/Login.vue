<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="p-4">
            <CCardBody>
              <CForm class="text-right" @submit.prevent="login">
                <h1>ورود</h1>
                <p class="text-muted">ورود به پنل ادمین</p>
                <CInput
                  placeholder="نام کاربری"
                  v-model="username"
                  :isValid="validateusername"
                  autocomplete="username email"
                >
                  <template #prepend-content
                    ><CIcon name="cil-user"
                  /></template>
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
                    <CButton type="submit" color="primary" class="px-4"
                      >ورود</CButton
                    >
                  </CCol>
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
      username: "",
      password: "",
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
      if (!this.validatepassword || !this.validateusername) return;
      try {
        const { data } = await Login({
          username: this.username,
          password: this.password,
        });

        if (data.Token) {
          localStorage.setItem(
            process.env.VUE_APP_ENV_APPLICATION_TOKEN_KEY,
            data.Token
          );
          this.$store.dispatch("setAdminInfo", data, { root: true });
        }
      } catch (ex) {
        debugger;
        this.$store.dispatch(
          "addAlert",
          {
            messageHeader: "خطا",
            type: "danger",
            messageBody: ex.message || "خطایی رخ داده لطفا دوباره تلاش کنید",
            autoHide: true,
            timeout: 3000,
          },
          { root: true }
        );
      }
    },
  },
};
</script>
