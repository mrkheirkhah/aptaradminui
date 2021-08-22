<template>
  <div v-if="data && data.length > 0">
    <template v-for="imageData in data">
      <ShowDataCard
        :key="imageData.id"
        :title="'محصول با کد: ' + imageData.id"
        icon="cil-applications"
        store-link="/admin/productimgage/"
        store-name="همه عکس‌های محصولات"
        :fieldsToShow="fieldsToShow[imageData.id]"
      />
    </template>
  </div>
</template>

<script>
import { getOne } from "@/services/product/images";
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
        id: "",
        title: "",
        priority: "",
        type: "",
        thumbnail: "",
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
    productImageTypesObjectMappedById() {
      const productImageTypesObject = {};
      this.$store.state.productImageTypesArray.map((stateObj) => {
        productImageTypesObject[stateObj.id] = stateObj.title;
      });
      return productImageTypesObject;
    },
    fieldsToShow() {
      const self = this;
      const fileds = {};
      debugger;
      for (const imageData of this.data) {
        fileds[imageData.id] = [
          {
            filedName: "id",
            persianName: "محصول",
            type: "text",
            data: self.productsObjectMappedById[imageData.id],
            col: "6",
          },
          {
            filedName: "type",
            persianName: "نوع عکس",
            type: "option",
            data: "نامشخص", //self.productImageTypesObjectMappedById[imageData.type],
            col: "6",
          },
          {
            filedName: "priority",
            persianName: "اولویت",
            type: "text",
            data: "نامشخص", //imageData.priority,
            col: "6",
          },
          {
            filedName: "thumbnail",
            persianName: "وضعیت",
            type: "image",
            data: "http://admin.aptar.ir​" + imageData.thumbnail,
            col: "12",
          },
        ];
      }
      return fileds;
    },
  },
};
</script>