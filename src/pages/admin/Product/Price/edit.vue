<template>
  <EditDataCard
    title="title"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/productprice/"
    store-name="همه قیمت محصولات"
    :fields="fields"
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
        "productOptionID",
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
        },
        {
          name: "subscriptionID",
          persianLabel: "اشتراک",
          type: "option",
          options: self.subscriptionsObjectMappedById,
          col: "6",
        },
        {
          name: "payTypeID",
          persianLabel: "نوع پرداخت",
          type: "option",
          options: self.payTypesObjectMappedById,
          col: "6",
        },
        {
          name: "price",
          persianLabel: "قیمت",
          type: "text",
          col: "6",
        },
        {
          name: "realPrice",
          persianLabel: "قیمت واقعی",
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
          col: "12",
        },
      ];
    },
  },
};
</script>