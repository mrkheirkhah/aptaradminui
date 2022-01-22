<template>
  <AddDataCard
    title="ثبت قیمت محصول جدید"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/productprice/store"
    store-name="همه محصولات"
    :fields="fields"
    storePageName="storeProductPrice"
    showBreadCrumbs
    :breadCrumbLinks="[{ to: '/admin/product/store', text: 'محصولات' }, { to: '/admin/productprice', text: 'قیمت محصولات' }, { to: '/admin/productprice/add', text: 'اضافه کردن قیمت محصول' }]"
    :addInfoMethod="add"
    :keysToPost="keysToPost"
    :categoryUpdateActions="categoryUpdateActions"
  />
</template>

<script>
import { add } from "@/services/product/prices";
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
        "payTypeID",
        "price",
        "realPrice",
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
    payTypesObjectMappedById() {
      return this.$store.state.payTypesArray.map((stateObj) => ({
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
          name: "payTypeID",
          persianLabel: "نوع پرداخت",
          type: "option",
          options: self.payTypesObjectMappedById,
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "لطفا نوع پرداخت را انتخاب کنید",
        },
        {
          name: "price",
          persianLabel: "قیمت",
          type: "number",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && !Number.isNaN(val),
          invalidFeedback: "لطفا قیمت را مشخص کنید",
        },
        {
          name: "realPrice",
          persianLabel: "قیمت واقعی",
          type: "number",
          col: "6",
          validationFunction: (val) => !val || (val && !Number.isNaN(val)),
          invalidFeedback: "لطفا قیمت واقعی را مشخص کنید",
        },
        {
          name: "priority",
          persianLabel: "اولویت",
          type: "number",
          col: "6",
          isRequired: true,
          validationFunction: (val) => !val || (val && !Number.isNaN(val)),
          invalidFeedback: "لطفا اولویت را مشخص کنید",
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
