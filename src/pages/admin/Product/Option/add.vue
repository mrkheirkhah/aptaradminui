<template>
  <AddDataCard
    title="ثبت آپشن محصول جدید"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/productoption/store"
    store-name="همه محصولات"
    :fields="fields"
    storePageName="storeProductOption"
    showBreadCrumbs
    :breadCrumbLinks="[{ to: '/admin/product/store', text: 'محصولات' }, { to: '/admin/productoption', text: 'آپشن محصولات' }, { to: '/admin/productoption/add', text: 'اضافه کردن آپشن محصول' }]"
    :addInfoMethod="add"
    :keysToPost="keysToPost"
    :categoryUpdateActions="categoryUpdateActions"
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
      categoryUpdateActions: ["fetchProducts"],
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
          defaultVal: +self.$route.query.prodID,
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && val !== "",
          invalidFeedback: "لطفا محصول را انتخاب کنید",
        },
        {
          name: "subscriptionID",
          persianLabel: "اشتراک",
          type: "option",
          options: self.subscriptionsObjectMappedById,
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && val !== "",
          invalidFeedback: "لطفا اشتراک را انتخاب کنید",
        },
        {
          name: "optionID",
          persianLabel: "آپشن",
          type: "option",
          options: self.optionsObjectMappedById,
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && val !== "",
          invalidFeedback: "لطفا نوع آپشن را انتخاب کنید",
        },
        {
          name: "price",
          persianLabel: "قیمت",
          type: "number",
          col: "6",
          validationFunction: (val) => !val || (val && !Number.isNaN(val)),
          invalidFeedback: "لطفا قیمت را وارد کنید",
        },
        {
          name: "priority",
          persianLabel: "اولویت",
          type: "number",
          col: "6",
          validationFunction: (val) => !val || (val && !Number.isNaN(val)),
          invalidFeedback: "لطفا اولویت را مشخص کنید",
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
