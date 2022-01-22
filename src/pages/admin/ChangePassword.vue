<template>
  <div class="flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="p-4">
            <CCardBody style="max-height: calc(100vh - 240px); overflow: auto">
              <CForm class="text-right" @submit.prevent="submitNewPassword">
                <h1 class="mb-4">تغییر رمز عبور</h1>
                <CInput
                  placeholder="رمزعبور فعلی"
                  type="password"
                  autocomplete="curent-password"
                  v-model="password"
                >
                  <template #prepend-content
                    ><CIcon name="cil-lock-locke"
                  /></template>
                </CInput>
                <CInput
                  placeholder="رمزعبور جدید"
                  type="password"
                  :isValid="validatepassword"
                  autocomplete="new-password"
                  v-model="newPassword"
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
                      />ثبت</CButton
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
import { changePassword } from "../../services/auth";
export default {
  name: "Login",
  data() {
    return {
      requestInProgress: false,
      password: "",
      newPassword: "",
      errText: null,
    };
  },
  computed: {
    userID() {
      return this.$store.state.adminUser.userID;
    },
  },
  methods: {
    validatepassword() {
      return this.password !== "";
    },
    async submitNewPassword() {
      if (!this.validatepassword) return;
      this.requestInProgress = true;
      try {
        const { data } = await changePassword({
          userID: this.userID,
          password: this.password,
          newPassword: this.newPassword,
        });
        if (data) {
          localStorage.removeItem(
            process.env.VUE_APP_ENV_APPLICATION_TOKEN_KEY
          );
          localStorage.removeItem("username", this.username);
          setTimeout(() => this.$router.push({ path: "/login" }), 500);
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
  created() {
    if (!this.userID)
      this.$router.push({ path: "/login?redirect=/admin/change-password" });
  },
};
</script>
