<template>
  <EditDataCard
    title="title"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/category/"
    store-name="همه کاربران"
    :fields="fields"
    deleteIdField="categoryID"
    storePageName="storeCategory"
    :fetchInfoMethod="getOne"
    :updateInfoMethod="update"
    :deleteInfoMethod="remove"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { add, update, remove, getOne } from "../../../services/category";
import EditDataCard from "../../../components/base/EditDataCard.vue";
export default {
  components: { EditDataCard },
  data() {
    return {
      add,
      update,
      remove,
      getOne,
      keysToPost: ["title", "isActive", "categoryID"],
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