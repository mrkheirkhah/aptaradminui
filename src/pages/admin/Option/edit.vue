<template>
  <EditDataCard
    title="title"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/option/"
    deleteIdField="optionID"
    store-name="همه آپشن ها"
    :fields="fields"
    storePageName="storeOption"
    :fetchInfoMethod="getOne"
    :updateInfoMethod="update"
    :deleteInfoMethod="remove"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { add, update, remove, getOne } from "../../../services/option";
import EditDataCard from "../../../components/base/EditDataCard.vue";
export default {
  components: { EditDataCard },
  data() {
    return {
      add,
      update,
      remove,
      getOne,
      keysToPost: ["title", "value", "optionID", "optionTypeID", "isActive"],
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
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "نوع آپشن را انتخاب کنید",
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
          type: "text",
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