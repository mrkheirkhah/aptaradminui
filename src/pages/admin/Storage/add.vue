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
    :keysToPost="keysToPost"
  />
</template>

<script>
import { addPerson } from "../../../services/person";
import AddDataCard from "../../../components/base/AddDataCard.vue";
export default {
  components: { AddDataCard },
  data() {
    return {
      addPerson,
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
    fields() {
      const self = this;
      return [
        {
          name: "userName",
          type: "text",
          persianLabel: "نام کاربری",
          col: "6",
        },
        {
          name: "password",
          type: "password",
          persianLabel: "رمز‌عبور",
          col: "6",
        },
        { name: "firstName", type: "text", persianLabel: "نام", col: "6" },
        {
          name: "lastName",
          type: "text",
          persianLabel: "نام خانوادگی",
          col: "6",
        },
        {
          name: "nationalCode",
          type: "text",
          persianLabel: "کد ملی",
          col: "6",
        },
        { name: "email", type: "text", persianLabel: "ایمیل", col: "6" },
        { name: "mobile", type: "text", persianLabel: "تلفن همراه", col: "6" },
        { name: "phone", type: "text", persianLabel: "تلفن ثابت", col: "6" },
        { name: "zipCode", type: "text", persianLabel: "کد پستی", col: "6" },
        {
          name: "stateID",
          type: "option",
          persianLabel: "استان",
          options: self.statesArr,
          col: "6",
        },
        { name: "address", type: "text", persianLabel: "آدرس", col: "6" },
        {
          name: "caption",
          type: "textarea",
          persianLabel: "زیرنویس",
          col: "12",
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
