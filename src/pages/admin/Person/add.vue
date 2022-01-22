<template>
  <AddDataCard
    title="ثبت کاربر جدید"
    icon="cil-user-follow"
    store-icon="cil-user-follow"
    store-link="/admin/person/"
    store-name="همه کاربران"
    :fields="fields"
    storePageName="storePersons"
    :addInfoMethod="addPerson"
    :categoryUpdateActions="categoryUpdateActions"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { verifyIranianNationalId } from "persian-tools";
import { checkEmail, checkPhoneNumber, checkMobileNumber } from "@/utils";
import { addPerson } from "../../../services/person";
import AddDataCard from "../../../components/base/AddDataCard.vue";
export default {
  components: { AddDataCard },
  data() {
    return {
      addPerson,
      categoryUpdateActions: ["fetchpersons"],
      keysToPost: [
        "userName",
        "password",
        "profileID",
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
      ],
    };
  },
  computed: {
    statesArr() {
      return this.$store.state.statesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    profilesArr() {
      return this.$store.state.profilesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    fields() {
      const self = this;
      return [
        {
          name: "userName",
          type: "text",
          persianLabel: "نام کاربری",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "نام کاربری را بصورت صحیح وارد کنید",
          autocomplete: "off",
          defaultVal: "",
        },
        {
          name: "password",
          type: "text",
          persianLabel: "رمز‌عبور",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "رمز عبور را بصورت صحیح وارد کنید",
          autocomplete: "off",
          defaultVal: "",
        },
        {
          name: "firstName",
          type: "text",
          persianLabel: "نام",
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "نام کاربر را بصورت صحیح وارد کنید",
        },
        {
          name: "lastName",
          type: "text",
          persianLabel: "نام خانوادگی",
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "نام خانوادگی را بصورت صحیح وارد کنید",
        },
        {
          name: "nationalCode",
          type: "text",
          persianLabel: "کد ملی",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && verifyIranianNationalId(val),
          invalidFeedback: "کد ملی را بصورت صحیح وارد کنید",
        },
        {
          name: "email",
          type: "text",
          persianLabel: "ایمیل",
          col: "6",
          isRequired: false,
          validationFunction: (val) => !val || (val && checkEmail(val)),
          invalidFeedback: "ایمیل را بصورت صحیح وارد کنید",
        },
        {
          name: "mobile",
          type: "text",
          persianLabel: "تلفن همراه",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && checkMobileNumber(val),
          invalidFeedback: "تلفن همراه را بصورت صحیح وارد کنید",
        },
        {
          name: "phone",
          type: "text",
          persianLabel: "تلفن ثابت",
          placeholder: "021-44444444",
          col: "6",
          isRequired: false,
          validationFunction: (val) => !val || (val && checkPhoneNumber(val)),
          invalidFeedback: "تلفن ثابت را بصورت صحیح وارد کنید",
        },
        {
          name: "zipCode",
          type: "text",
          persianLabel: "کد پستی",
          col: "6",
          validationFunction: (val) => !val || (val && val.length >= 10),
          invalidFeedback: "کد پستی را بصورت صحیح وارد کنید",
        },
        {
          name: "stateID",
          type: "optionwithsearch",
          persianLabel: "استان",
          options: self.statesArr,
          col: "6",
          isRequired: false,
          validationFunction: (val) => !val || val,
          invalidFeedback: "استان را انتخاب کنید",
        },
        {
          name: "profileID",
          type: "optionwithsearch",
          persianLabel: "خطی مشی",
          options: self.profilesArr,
          col: "6",
          isRequired: false,
          validationFunction: (val) => !val || val,
          invalidFeedback: "خطی مشی را انتخاب کنید",
        },
        {
          name: "address",
          type: "textarea",
          persianLabel: "آدرس",
          col: "12",
          isRequired: false,
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "آدرس را وارد کنید",
        },
        {
          name: "isActive",
          type: "switch",
          persianLabel: "وضعیت حساب",
          col: "12",
        },
      ];
    },
  },
};
</script>
