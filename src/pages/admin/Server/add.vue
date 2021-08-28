<template>
  <AddDataCard
    title="ثبت سرور جدید"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/server/"
    store-name="همه سرورها"
    :fields="fields"
    storePageName="storeServer"
    :addInfoMethod="add"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { add } from "../../../services/server";
import AddDataCard from "../../../components/base/AddDataCard.vue";
export default {
  components: { AddDataCard },
  data() {
    return {
      add,
      keysToPost: [
        "title",
        "loadBalance",
        "address",
        "ip",
        "macAddress",
        "version",
        "isActive",
      ],
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "title",
          persianLabel: "نام",
          type: "text",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && val !== "",
          invalidFeedback: "لطفا نام را وارد کنید",
        },
        {
          name: "loadBalance",
          persianLabel: "لود بالانس",
          type: "number",
          col: "6",
          isRequired: true,
          validationFunction: (val) => !val || (val && !Number.isNaN(val)),
          invalidFeedback: "لطفا لود بالانس را مشخص کنید",
        },
        {
          name: "address",
          persianLabel: "آدرس",
          type: "text",
          col: "6",
          isRequired: true,
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "لطفا آدرس را وارد کنید",
        },
        {
          name: "ip",
          persianLabel: "ای پی",
          type: "text",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && val !== "",
          invalidFeedback: "لطفا ای پی را وارد کنید",
        },
        {
          name: "macAddress",
          persianLabel: "آدرس فیزیکی",
          type: "text",
          col: "6",
          isRequired: true,
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "لطفا آدرس فیزیکی را وارد کنید",
        },
        {
          name: "version",
          persianLabel: "ورژن",
          type: "text",
          col: "6",
          isRequired: true,
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "لطفا ورژن را وارد کنید",
        },
        {
          name: "isActive",
          persianLabel: "وضعیت",
          type: "switch",
          col: "12",
        },
      ];
    },
  },
};
</script>
