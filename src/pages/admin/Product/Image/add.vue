<template>
  <AddDataCard
    title="ثبت عمس محصول جدید"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/productimage/store"
    store-name="همه محصولات"
    :fields="fields"
    storePageName="productImage"
    showBreadCrumbs
    :breadCrumbLinks="[{ to: '/admin/product/store', text: 'محصولات' }, { to: '/admin/productimage', text: 'تصویر محصولات' }, { to: '/admin/productimage/add', text: 'اضافه کردن تصویر محصول' }]"
    :addInfoMethod="add"
    :keysToPost="keysToPost"
    :categoryUpdateActions="categoryUpdateActions"
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
      categoryUpdateActions: ["fetchProducts"],
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
          defaultVal: +self.$route.query.prodID,
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
          type: "number",
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
