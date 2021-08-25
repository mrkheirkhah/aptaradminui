<template>
  <div>
    <ShowDataCard
      :title="data.title"
      icon="cil-applications"
      store-link="/admin/productoption/"
      store-name="همه آپشن ها محصولات"
      :fieldsToShow="fieldsToShow"
    />
  </div>
</template>

<script>
import { getOne } from "@/services/product/options";
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
        optionID: "",
        price: "",
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
    optionsObjectMappedById() {
      const optionsObject = {};
      this.$store.state.optionsArray.map((stateObj) => {
        optionsObject[stateObj.id] = stateObj.title;
      });
      return optionsObject;
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
          filedName: "optionID",
          persianName: "نوع آپشن",
          type: "option",
          data: self.optionsObjectMappedById[self.data.optionID],
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