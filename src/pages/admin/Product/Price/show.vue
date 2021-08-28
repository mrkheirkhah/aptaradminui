<template>
  <div>
    <ShowDataCard
      :title="data.price"
      icon="cil-applications"
      store-link="/admin/productprice/"
      store-name="همه قیمت محصولات"
      :fieldsToShow="fieldsToShow"
    />
  </div>
</template>

<script>
import { getOne } from "@/services/product/prices";
import showPageMixin from "@/mixins/showPage";
import ShowDataCard from "@/components/base/ShowDataCard.vue";
import { properStatus } from "@/utils";
export default {
  mixins: [showPageMixin],
  components: { ShowDataCard },
  data() {
    return {
      properStatus,
      fetchInfoMethod: getOne,
      data: {
        productID: "",
        subscriptionID: "",
        payTypeID: "",
        price: "",
        realPrice: "",
        priority: "",
        isActive: "",
        productOptionID: "",
      },
    };
  },
  computed: {
    productsObjectMappedById() {
      const productsObject = {};
      this.$store.state.productsArray.map((stateObj) => {
        productsObject[stateObj.id] = stateObj.title;
      });
      return productsObject;
    },
    subscriptionsObjectMappedById() {
      const subscriptionsObject = {};
      this.$store.state.subscriptionsArray.map((stateObj) => {
        subscriptionsObject[stateObj.id] = stateObj.title;
      });
      return subscriptionsObject;
    },
    payTypesObjectMappedById() {
      const payTypesObject = {};
      this.$store.state.payTypesArray.map((stateObj) => {
        payTypesObject[stateObj.id] = stateObj.title;
      });
      return payTypesObject;
    },
    fieldsToShow() {
      const self = this;
      return [
        {
          filedName: "productID",
          persianName: "محصول",
          type: "text",
          data: self.productsObjectMappedById[self.data.productID],
          col: "6",
        },
        {
          filedName: "subscriptionID",
          persianName: "اشتراک",
          type: "option",
          data: self.subscriptionsObjectMappedById[self.data.subscriptionID],
          col: "6",
        },
        {
          filedName: "payTypeID",
          persianName: "نوع پرداخت",
          type: "option",
          data: self.payTypesObjectMappedById[self.data.payTypeID],
          col: "6",
        },
        {
          filedName: "price",
          persianName: "قیمت",
          type: "text",
          data: self.data.price,
          col: "6",
        },
        {
          filedName: "realPrice",
          persianName: "قیمت واقعی",
          type: "text",
          data: self.data.realPrice,
          col: "6",
        },
        {
          filedName: "priority",
          persianName: "اولویت",
          type: "text",
          data: self.data.priority,
          col: "6",
        },
        {
          filedName: "isActive",
          persianName: "وضعیت",
          type: "switch",
          data: self.properStatus(self.data.isActive),
          col: "12",
        },
      ];
    },
  },
};
</script>