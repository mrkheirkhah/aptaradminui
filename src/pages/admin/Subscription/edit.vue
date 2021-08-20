<template>
  <EditDataCard
    title="title"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/subscription/"
    store-name="همه اشتراک‌ها"
    :fields="fields"
    storePageName="storeSubscription"
    :fetchInfoMethod="getOne"
    :updateInfoMethod="update"
    :deleteInfoMethod="remove"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { add, update, remove, getOne } from "../../../services/subscription";
import EditDataCard from "../../../components/base/EditDataCard.vue";
export default {
  components: { EditDataCard },
  data() {
    return {
      add,
      update,
      remove,
      getOne,
      keysToPost: [
        "title",
        "value",
        "subscriptionID",
        "subscriptionTypeID",
        "isActive",
      ],
    };
  },
  computed: {
    subscriptionTypesObjectMappedById() {
      return this.$store.state.subscriptionTypesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    fields() {
      const self = this;
      return [
        {
          name: "subscriptionTypeID",
          persianLabel: "نوع اشتراک",
          type: "option",
          options: self.subscriptionTypesObjectMappedById,
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