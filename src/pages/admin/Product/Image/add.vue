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
import { add } from "@/services/product/images";
import AddDataCard from "@/components/base/AddDataCard.vue";
export default {
  components: { AddDataCard },
  data() {
    return {
      add,
      keysToPost: ["fileOption", "id", "file", "priority"],
    };
  },
  computed: {
    productsObjectMappedById() {
      return this.$store.state.productsArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    productImageTypesObjectMappedById() {
      return this.$store.state.productImageTypesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    fields() {
      const self = this;
      return [
        {
          name: "id",
          persianLabel: "محصول",
          type: "option",
          options: self.productsObjectMappedById,
          col: "6",
        },

        {
          name: "fileOption",
          persianLabel: "نوع عکس",
          type: "option",
          options: self.productImageTypesObjectMappedById,
          col: "6",
        },
        {
          name: "priority",
          persianLabel: "اولویت",
          type: "text",
          col: "6",
        },
        {
          name: "file",
          persianLabel: "انتخاب عکس",
          type: "file",
          refName: "productImage",
          col: "6",
        },
      ];
    },
  },
};
</script>
