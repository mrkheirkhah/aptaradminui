<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <CIcon name="cil-user-follow" />
            ثبت کاربر جدید
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
            :value="data.UserName"
            @input="(e) => (data.UserName = e)"
            label="نام کاربری"
            placeholder="نام کاربری"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.Password"
            @input="(e) => (data.Password = e)"
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
            :value="data.FirstName"
            @input="(e) => (data.FirstName = e)"
            label="نام"
            placeholder="نام"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.LastName"
            @input="(e) => (data.LastName = e)"
            label="نام خانوادگی"
            placeholder="نام خانوادگی"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.NationalCode"
            @input="(e) => (data.NationalCode = e)"
            label="کد ملی"
            placeholder="کد ملی"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.Email"
            @input="(e) => (data.Email = e)"
            label="ایمیل"
            placeholder="ایمیل"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.Mobile"
            @input="(e) => (data.Mobile = e)"
            label="تلفن همراه"
            placeholder="تلفن همراه"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.Phone"
            @input="(e) => (data.Phone = e)"
            label="تلفن ثابت"
            placeholder="تلفن ثابت"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.ZipCode"
            @input="(e) => (data.ZipCode = e)"
            label="کد پستی"
            placeholder="کد پستی"
          />
        </CCol>
        <CCol sm="6">
          <CSelect
            :value="statesObjectMappedById[data.StateID]"
            label="استان"
            :options="statesArr"
          />
        </CCol>
        <CCol sm="12">
          <CInput
            :value="data.Address"
            @input="(e) => (data.Address = e)"
            label="آدرس"
            placeholder="آدرس"
          />
        </CCol>
        <CCol sm="12">
          <CTextarea
            :value="data.Caption"
            @input="(e) => (data.Caption = e)"
            label="زیرنویس"
            placeholder="زیرنویس..."
            rows="4"
          />
        </CCol>
        <CCol sm="12">
          <div class="d-flex justify-center align-items-center">
            وضعیت حساب: {{ data.IsActive ? "فعال" : "غیر‌فعال" }}
            <CSwitch
              class="mr-2"
              :checked="data.IsActive"
              color="success"
              v-bind="{ variant: '3d' }"
              value="success"
              @update:checked="(status) => (data.IsActive = status)"
            />
          </div>
        </CCol>
      </CRow>
      <CRow class="mt-3">
        <CCol sm="12">
          <CButton
            :class="{ 'disabled-btn': performingAction }"
            color="success"
            style="width: 100%"
            @click="addInfo"
          >
            <CIcon v-if="!performingAction" size="sm" name="cil-user-follow" />
            <CSpinner v-else size="sm" />
            ثبت
          </CButton></CCol
        >
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
import { addPerson } from "../../../services/person";
import addPageMixin from "../../../mixins/addPage";
export default {
  mixins: [addPageMixin],
  data() {
    return {
      addInfoMethod: addPerson,
      storePageName: "storePersons",
      showPass: false,
      keysToPost: [
        "UserName",
        "Password",
        "FirstName",
        "LastName",
        "Caption",
        "NationalCode",
        "Email",
        "Phone",
        "Mobile",
        "ZipCode",
        "StateID",
        "Address",
        "IsActive",
      ],
      data: {
        UserName: "",
        Password: "",
        FirstName: "",
        LastName: "",
        Caption: "",
        NationalCode: "",
        Email: "",
        Phone: "",
        Mobile: "",
        ZipCode: "",
        StateID: 0,
        Address: "",
        IsActive: false,
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
