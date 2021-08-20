<template>
  <AddDataCard
    title="ثبت تنظیمات جدید"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/option/"
    store-name="همه تنظیمات"
    :fields="fields"
    storePageName="storeOption"
    :addInfoMethod="add"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { add } from "../../../services/option";
import AddDataCard from "../../../components/base/AddDataCard.vue";
export default {
  components: { AddDataCard },
  data() {
    return {
      add,
      keysToPost: ["title", "value", "optionTypeID", "isActive"],
    };
  },
  computed: {
    optionTypesObjectMappedById() {
      return this.$store.state.optionTypesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    fields() {
      const self = this;
      return [
        {
          name: "optionTypeID",
          persianLabel: "نوع تنظیمات",
          type: "option",
          options: self.optionTypesObjectMappedById,
          col: "6",
        },
        {
          name: "title",
          persianLabel: "نام",
          type: "text",
          col: "6",
        },
        {
          name: "value",
          persianLabel: "مقدار",
          type: "text",
          col: "6",
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
