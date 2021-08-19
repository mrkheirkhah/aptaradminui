<template>
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
          <CInput
            :value="data.userName"
            @input="(e) => (data.userName = e)"
            label="نام کاربری"
            placeholder="نام کاربری"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.password"
            @input="(e) => (data.password = e)"
            label="رمز‌عبور"
            @focus="showPass = true"
            @blur="showPass = false"
            placeholder="رمز‌عبور"
            :type="showPass ? 'text' : 'password'"
          >
          </CInput>
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.firstName"
            @input="(e) => (data.firstName = e)"
            label="نام"
            placeholder="نام"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.lastName"
            @input="(e) => (data.lastName = e)"
            label="نام خانوادگی"
            placeholder="نام خانوادگی"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.nationalCode"
            @input="(e) => (data.nationalCode = e)"
            label="کد ملی"
            placeholder="کد ملی"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.email"
            @input="(e) => (data.email = e)"
            label="ایمیل"
            placeholder="ایمیل"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.mobile"
            @input="(e) => (data.mobile = e)"
            label="تلفن همراه"
            placeholder="تلفن همراه"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.phone"
            @input="(e) => (data.phone = e)"
            label="تلفن ثابت"
            placeholder="تلفن ثابت"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.zipCode"
            @input="(e) => (data.zipCode = e)"
            label="کد پستی"
            placeholder="کد پستی"
          />
        </CCol>
        <CCol sm="6">
          <CSelect
            :value="statesObjectMappedById[data.stateID]"
            label="استان"
            :options="statesArr"
          />
        </CCol>
        <CCol sm="12">
          <CInput
            :value="data.address"
            @input="(e) => (data.address = e)"
            label="آدرس"
            placeholder="آدرس"
          />
        </CCol>
        <CCol sm="12">
          <CTextarea
            :value="data.caption"
            @input="(e) => (data.caption = e)"
            label="زیرنویس"
            placeholder="زیرنویس..."
            rows="4"
          />
        </CCol>
        <CCol sm="12">
          <div class="d-flex justify-center align-items-center">
            وضعیت حساب: {{ data.isActive ? "فعال" : "غیر‌فعال" }}
            <CSwitch
              class="mr-2"
              :checked="data.isActive"
              color="success"
              v-bind="{ variant: '3d' }"
              value="success"
              @update:checked="(status) => (data.isActive = status)"
            />
          </div>
        </CCol>
      </CRow>
      <CRow class="mt-3">
        <CCol sm="6">
          <CButton
            :class="{ 'disabled-btn': performingAction }"
            color="success"
            style="width: 100%"
            @click="updateInfo"
          >
            <CIcon v-if="!performingAction" size="sm" name="cil-save" />
            <CSpinner v-else size="sm" />
            ذخیره
          </CButton></CCol
        >
        <CCol sm="6">
          <CButton
            :class="{ 'disabled-btn': performingAction }"
            color="danger"
            @click="deleteInfo"
            style="width: 100%"
            v-bind="{ variant: 'outline' }"
            ><CIcon v-if="!performingAction" size="sm" name="cil-trash" />
            <CSpinner v-else size="sm" />
            حذف اکانت
          </CButton></CCol
        >
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
import {
  getPerson,
  updatePerson,
  deletePerson,
} from "../../../services/person";
import editPageMixin from "../../../mixins/editPage";
export default {
  mixins: [editPageMixin],
  data() {
    return {
      fetchInfoMethod: getPerson,
      updateInfoMethod: updatePerson,
      deleteInfoMethod: deletePerson,
      storePageName: "storePersons",
      showPass: false,
      keysToPost: [
        "userName",
        "password",
        "firstName",
        "lastName",
        "caption",
        "nationalCode",
        "email",
        "phone",
        "mobile",
        "zipCode",
        "stateID",
        "address",
        "isActive",
        "personID",
      ],
      data: {
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        caption: "",
        nationalCode: "",
        email: "",
        phone: "",
        mobile: "",
        zipCode: "",
        stateID: 0,
        address: "",
        isActive: false,
        personID: 0,
      },
    };
  },
  computed: {
    statesArr() {
      return this.$store.state.statesArray.map((stateObj) => stateObj.title);
    },
    statesObjectMappedByName() {
      const statesObject = {};
      this.$store.state.statesArray.map((stateObj) => {
        statesObject[stateObj.title] = stateObj.id;
      });
      return statesObject;
    },
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