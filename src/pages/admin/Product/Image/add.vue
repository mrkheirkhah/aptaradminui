<template>
  <AddDataCard
    title="ثبت آپشن محصول جدید"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/productoption/"
    store-name="همه آپشن ها محصولات"
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
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "لطفا محصول را مشخص کنید",
        },

        {
          name: "fileOption",
          persianLabel: "نوع عکس",
          type: "option",
          options: self.productImageTypesObjectMappedById,
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "لطفا نوع عکس را مشخص کنید",
        },
        {
          name: "priority",
          persianLabel: "اولویت",
          type: "text",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && !Number.isNaN(val),
          invalidFeedback: "لطفا اولویت را مشخص کنید",
        },
        {
          name: "file",
          persianLabel: "انتخاب عکس",
          type: "file",
          refName: "productImage",
          col: "6",
          validationFunction: (val) => {
            return (
              val &&
              (val[0].type === "image/png" || val[0].type === "image/jpeg")
            );
          },
          invalidFeedback: "لطفا تصویر مورد نظر را انتخاب کنید ",
        },
      ];
    },
  },
};
</script>
