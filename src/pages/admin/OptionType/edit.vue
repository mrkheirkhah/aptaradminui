<template>
  <EditDataCard
    title="title"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/optiontype/"
    store-name="نوع آپشن ها"
    deleteIdField="optionTypeID"
    :fields="fields"
    storePageName="storeOptionType"
    :fetchInfoMethod="getOne"
    :updateInfoMethod="update"
    :deleteInfoMethod="remove"
    :keysToPost="keysToPost"
    :categoryUpdateActions="categoryUpdateActions"
  />
</template>

<script>
import { add, update, remove, getOne } from "../../../services/option/type";
import EditDataCard from "../../../components/base/EditDataCard.vue";
export default {
  components: { EditDataCard },
  data() {
    return {
      add,
      update,
      remove,
      getOne,
      keysToPost: ["title", "optionTypeID"],
      categoryUpdateActions: ["fetchOptionTypes"],
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
          isRequired: true,
          validationFunction: (val) => val && val !== "",
          invalidFeedback: "لطفا نام را وارد کنید",
        },
      ];
    },
  },
};
</script>
