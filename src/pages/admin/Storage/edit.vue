<template>
  <EditDataCard
    title="title"
    icon="cil-save"
    store-icon="cil-save"
    store-link="/admin/storage/"
    store-name="ذخیره سازی"
    :fields="fields"
    deleteIdField="storageID"
    storePageName="storeStorage"
    :fetchInfoMethod="getOne"
    :updateInfoMethod="update"
    :deleteInfoMethod="remove"
    :keysToPost="keysToPost"
    :categoryUpdateActions="categoryUpdateActions"
  />
</template>

<script>
import { getOne, update, remove } from "../../../services/storage";
import EditDataCard from "../../../components/base/EditDataCard.vue";
export default {
  components: { EditDataCard },
  data() {
    return {
      getOne,
      update,
      remove,
      categoryUpdateActions: ["fetchStorages"],
      keysToPost: [
        "title",
        "price",
        "value",
        "enable",
        "timePeriod",
        "storageID",
      ],
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
          type: "number",
          persianLabel: "قیمت",
          col: "6",
        },
        { name: "value", type: "text", persianLabel: "مقدار", col: "6" },
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
