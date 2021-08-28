<template>
  <EditDataCard
    title="price"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/productprice/"
    store-name="همه قیمت محصولات"
    :fields="fields"
    deleteIdField="productPriceID"
    storePageName="storeProductPrice"
    :fetchInfoMethod="getOne"
    :updateInfoMethod="update"
    :deleteInfoMethod="remove"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { add, update, remove, getOne } from "@/services/product/prices";
import EditDataCard from "@/components/base/EditDataCard.vue";
export default {
  components: { EditDataCard },
  data() {
    return {
      add,
      update,
      remove,
      getOne,
      keysToPost: [
        "productID",
        "subscriptionID",
        "payTypeID",
        "price",
        "realPrice",
        "priority",
        "isActive",
        "productPriceID",
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
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "لطفا محصول را انتخاب کنید",
        },
        {
          name: "subscriptionID",
          persianLabel: "اشتراک",
          type: "option",
          options: self.subscriptionsObjectMappedById,
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "لطفا اشتراک را انتخاب کنید",
        },
        {
          name: "payTypeID",
          persianLabel: "نوع پرداخت",
          type: "option",
          options: self.payTypesObjectMappedById,
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "لطفا نوع پرداخت را انتخاب کنید",
        },
        {
          name: "price",
          persianLabel: "قیمت",
          type: "text",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && !Number.isNaN(val),
          invalidFeedback: "لطفا قیمت را مشخص کنید",
        },
        {
          name: "realPrice",
          persianLabel: "قیمت واقعی",
          type: "text",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && !Number.isNaN(val),
          invalidFeedback: "لطفا قیمت واقعی را مشخص کنید",
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