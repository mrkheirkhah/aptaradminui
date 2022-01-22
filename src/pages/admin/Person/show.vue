<template>
  <div>
    <ShowDataCard
      :title="data.userName"
      icon="cil-user"
      store-link="/admin/person/"
      store-name="همه کاربران"
      :categoryUpdateActions="categoryUpdateActions"
      :fieldsToShow="fieldsToShow"
    />
  </div>
</template>

<script>
import { getPerson } from "../../../services/person";
import showPageMixin from "../../../mixins/showPage";
import ShowDataCard from "../../../components/base/ShowDataCard.vue";
import { properStatus } from "../../../utils";
export default {
  mixins: [showPageMixin],
  components: { ShowDataCard },
  data() {
    return {
      properStatus,
      fetchInfoMethod: getPerson,
      categoryUpdateActions: ["fetchpersons"],
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
    fieldsToShow() {
      const self = this;
      return [
        {
          filedName: "userName",
          persianName: "نام کاربری",
          type: "",
          data: self.data.userName,
          col: "6",
        },
        {
          filedName: "password",
          persianName: "رمز‌عبور",
          type: "",
          data: self.data.password,
          col: "6",
        },
        {
          filedName: "firstName",
          persianName: "نام",
          type: "",
          data: self.data.firstName,
          col: "6",
        },
        {
          filedName: "lastName",
          persianName: "نام خانوادگی",
          type: "",
          data: self.data.lastName,
          col: "6",
        },
        {
          filedName: "nationalCode",
          persianName: "کد ملی",
          type: "",
          data: self.data.nationalCode,
          col: "6",
        },
        {
          filedName: "email",
          persianName: "ایمیل",
          type: "",
          data: self.data.email,
          col: "6",
        },
        {
          filedName: "mobile",
          persianName: "تلفن همراه",
          type: "",
          data: self.data.mobile,
          col: "6",
        },
        {
          filedName: "phone",
          persianName: "تلفن ثابت",
          type: "",
          data: self.data.phone,
          col: "6",
        },
        {
          filedName: "zipCode",
          persianName: "کد پستی",
          type: "",
          data: self.data.zipCode,
          col: "6",
        },
        {
          filedName: "stateID",
          persianName: "استان",
          type: "",
          data: self.statesObjectMappedById[self.data.stateID],
          col: "6",
        },
        {
          filedName: "address",
          persianName: "آدرس",
          type: "",
          data: self.data.address,
          col: "12",
        },
        {
          filedName: "isActive",
          persianName: "وضعیت حساب",
          type: "",
          data: self.properStatus(self.data.isActive),
          col: "12",
        },
      ];
    },
  },
};
</script>
