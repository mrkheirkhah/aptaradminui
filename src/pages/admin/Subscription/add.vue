<template>
  <AddDataCard
    title="ثبت اشتراک‌ جدید"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/subscription/"
    store-name="همه اشتراک‌ها"
    :fields="fields"
    storePageName="storeSubscription"
    :addInfoMethod="add"
    :keysToPost="keysToPost"
    :categoryUpdateActions="categoryUpdateActions"
  />
</template>

<script>
import { add } from "../../../services/subscription";
import AddDataCard from "../../../components/base/AddDataCard.vue";
export default {
  components: { AddDataCard },
  data() {
    return {
      add,
      categoryUpdateActions: ["fetchSubscriptionTypes", "fetchSubscriptions"],
      keysToPost: ["title", "value", "subscriptionTypeID", "isActive"],
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
          isRequired: true,
          validationFunction: (val) => val && val !== "",
          invalidFeedback: "لطفا نوع اشتراک را مشخص کنید",
        },
        {
          name: "title",
          persianLabel: "نام",
          type: "text",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && val !== "",
          invalidFeedback: "لطفا نام را وارد کنید",
        },
        {
          name: "value",
          persianLabel: "مقدار",
          type: "number",
          col: "6",
          validationFunction: (val) => !val || (val && !Number.isNaN(val)),
          invalidFeedback: "لطفا مقدار را مشخص کنید",
        },
        {
          name: "isActive",
          persianLabel: "وضعیت",
          type: "switch",
          col: "6",
        },
      ];
    },
  },
};
</script>
