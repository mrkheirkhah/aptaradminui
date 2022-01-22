<template>
  <AddDataCard
    title="ثبت آپشن جدید"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/option/"
    store-name="همه آپشن ها"
    :fields="fields"
    storePageName="storeOption"
    :addInfoMethod="add"
    :keysToPost="keysToPost"
    :categoryUpdateActions="categoryUpdateActions"
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
      categoryUpdateActions: ["fetchOptions"],
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
          persianLabel: "نوع آپشن",
          type: "option",
          options: self.optionTypesObjectMappedById,
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "نوع آپشن را انتخاب کنید",
          col: "6",
        },
        {
          name: "title",
          persianLabel: "نام",
          type: "text",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && val !== "",
          invalidFeedback: "نام آپشن را انتخاب کنید",
        },
        {
          name: "value",
          persianLabel: "مقدار",
          type: "number",
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "لطفا مقدار را مشخص کنید",
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
