<template>
  <CRow>
    <CCol sm="3"></CCol>
    <CCol sm="6">
      <CCard>
        <CCardHeader>
          <slot name="header">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <CIcon name="cil-user" />
                {{ data.userName }}
              </div>
              <CButton
                color="info"
                size="sm"
                class="m-2"
                link
                exact
                to="/admin/person/"
              >
                <CIcon name="cil-user" class="ml-1" />
                همه کاربران
              </CButton>
            </div>
          </slot>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>نام کاربری:</strong></p>
                <p class="pr-5">{{ data.userName }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>رمز‌عبور:</strong></p>
                <p class="pr-5">{{ data.password }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>نام:</strong></p>
                <p class="pr-5">{{ data.firstName }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>نام خانوادگی:</strong></p>
                <p class="pr-5">{{ data.lastName }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>کد ملی:</strong></p>
                <p class="pr-5">{{ data.nationalCode }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>ایمیل:</strong></p>
                <p class="pr-5">{{ data.email }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>تلفن همراه:</strong></p>
                <p class="pr-5">{{ data.mobile }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>تلفن ثابت:</strong></p>
                <p class="pr-5">{{ data.phone }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>کد پستی:</strong></p>
                <p class="pr-5">{{ data.zipCode }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>استان:</strong></p>
                <p class="pr-5">
                  {{ statesObjectMappedById[data.stateID] }}
                </p>
              </div>
              <hr />
            </CCol>
            <CCol sm="12">
              <div>
                <p class="text-bold"><strong>آدرس:</strong></p>
                <p class="pr-5">
                  {{ data.address }}
                </p>
              </div>
              <hr />
            </CCol>
            <CCol sm="12">
              <div>
                <p class="text-bold"><strong>زیرنویس:</strong></p>
                <p class="pr-5">
                  {{ data.caption }}
                </p>
              </div>
              <hr />
            </CCol>
            <CCol sm="12">
              <div class="d-flex justify-center align-items-center">
                <div>
                  <p class="text-bold"><strong>وضعیت حساب:</strong></p>
                  <p class="pr-5">
                    {{ data.isActive ? "فعال" : "غیر‌فعال" }}
                  </p>
                </div>
                <hr />
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol sm="3"></CCol>
  </CRow>
</template>

<script>
import { getPerson } from "../../../services/person";
import showPageMixin from "../../../mixins/showPage";
export default {
  mixins: [showPageMixin],
  data() {
    return {
      fetchInfoMethod: getPerson,
      data: {
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        caption: "...",
        nationalCode: "",
        email: "",
        phone: "",
        mobile: "",
        zipCode: "",
        stateID: 0,
        address: "",
        isActive: true,
        personID: 0,
      },
    };
  },
  computed: {
    statesObjectMappedById() {
      const statesObject = {};
      this.$store.state.statesArray.map((stateObj) => {
        statesObject[stateObj.id] = stateObj.title;
      });
      return statesObject;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>