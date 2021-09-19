<template>
  <AddDataCard
    title="ثبت ذخیره‌سازی جدید"
    icon="cil-user-follow"
    store-icon="cil-user-follow"
    store-link="/admin/storage/"
    store-name="ذخیره‌سازی"
    :fields="fields"
    storePageName="storeStorage"
    :addInfoMethod="add"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { add } from "../../../services/storage";
import AddDataCard from "../../../components/base/AddDataCard.vue";
export default {
  components: { AddDataCard },
  data() {
    return {
      add,
      keysToPost: ["title", "price", "value", "enable", "timePeriod"],
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "title",
          type: "text",
          persianLabel: "نام",
          col: "6",
        },
        {
          name: "price",
          type: "text",
          persianLabel: "قیمت",
          col: "6",
        },
        {
          name: "value",
          type: "text",
          persianLabel: "مقدار",
          col: "6",
        },
        {
          name: "enable",
          type: "checkbox",
          persianLabel: "فعال",
          col: "6",
        },
        {
          name: "timePeriod",
          type: "number",
          persianLabel: "بازه زمانی",
          col: "6",
        },
      ];
    },
  },
};
</script>
