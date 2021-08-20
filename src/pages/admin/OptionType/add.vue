<template>
  <AddDataCard
    title="ثبت نوع تنظیم"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/optiontype/"
    store-name="انواع تنظیمات"
    :fields="fields"
    storePageName="storeOptionType"
    :addInfoMethod="add"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { add } from "../../../services/option/type";
import AddDataCard from "../../../components/base/AddDataCard.vue";
export default {
  components: { AddDataCard },
  data() {
    return {
      add,
      keysToPost: ["title"],
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
      ];
    },
  },
};
</script>
