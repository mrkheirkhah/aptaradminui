<template>
  <AddDataCard
    title="ثبت ذخیره‌سازی جدید"
    icon="cil-save"
    store-icon="cil-save"
    store-link="/admin/storage/"
    store-name="ذخیره‌سازی"
    :fields="fields"
    storePageName="storeStorage"
    :addInfoMethod="add"
    :keysToPost="keysToPost"
    :categoryUpdateActions="categoryUpdateActions"
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
      categoryUpdateActions: ["fetchStorages"],
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "title",
          type: "text",
          persianLabel: "نام",
          isRequired: true,
          col: "6",
        },
        {
          name: "price",
          type: "text",
          persianLabel: "قیمت",
          isRequired: true,
          col: "6",
        },
        {
          name: "value",
          type: "text",
          persianLabel: "مقدار",
          isRequired: true,
          col: "6",
        },
        {
          name: "enable",
          type: "switch",
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
