<template>
  <AddDataCard
    title="ثبت تنظیمات محصول جدید"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/productoption/"
    store-name="همه تنظیمات محصولات"
    :fields="fields"
    storePageName="storeProductOption"
    :addInfoMethod="add"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { add } from "@/services/product/options";
import AddDataCard from "@/components/base/AddDataCard.vue";
export default {
  components: { AddDataCard },
  data() {
    return {
      add,
      keysToPost: [
        "productID",
        "subscriptionID",
        "optionID",
        "price",
        "priority",
        "isActive",
      ],
    };
  },
  computed: {
    productsObjectMappedById() {
      return this.$store.state.productsArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    subscriptionsObjectMappedById() {
      return this.$store.state.subscriptionsArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    optionsObjectMappedById() {
      return this.$store.state.optionsArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    fields() {
      const self = this;
      return [
        {
          name: "productID",
          persianLabel: "محصول",
          type: "option",
          options: self.productsObjectMappedById,
          col: "6",
        },
        {
          name: "subscriptionID",
          persianLabel: "اشتراک",
          type: "option",
          options: self.subscriptionsObjectMappedById,
          col: "6",
        },
        {
          name: "optionID",
          persianLabel: "نوع تنظیمات",
          type: "option",
          options: self.optionsObjectMappedById,
          col: "6",
        },
        {
          name: "price",
          persianLabel: "قیمت",
          type: "text",
          col: "6",
        },
        {
          name: "priority",
          persianLabel: "اولویت",
          type: "text",
          col: "6",
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
