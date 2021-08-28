<template>
  <AddDataCard
    title="ثبت دسته‌بندی‌ جدید"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/category/"
    store-name="همه دسته‌بندی‌ها"
    :fields="fields"
    storePageName="storeCategory"
    :addInfoMethod="add"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { add } from "../../../services/category";
import AddDataCard from "../../../components/base/AddDataCard.vue";
export default {
  components: { AddDataCard },
  data() {
    return {
      add,
      keysToPost: ["title", "isActive"],
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "title",
          type: "text",
          persianLabel: "نام",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "نام دسته بندی را انتخاب کنید",
          col: "6",
        },
        {
          name: "isActive",
          type: "switch",
          persianLabel: "وضعیت",
          col: "6",
        },
      ];
    },
  },
};
</script>
