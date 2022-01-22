<template>
  <div>
    <div v-if="data && data.length > 0">
      <template v-for="imageData in data">
        <ShowDataCard
          :key="imageData.id"
          :title="'عکس محصول با کد: ' + imageData.id"
          :showDelete="true"
          :deleteMethod="deleteMethod"
          deleteField="productImageID"
          :deleteFieldVal="imageData.id"
          icon="cil-applications"
          store-link="/admin/productimage/store"
          store-name="همه محصولات"
          showBreadCrumbs
          :breadCrumbLinks="[{ to: '/admin/product/store', text: 'محصولات' }, { to: '/admin/productimage', text: 'تصویر محصولات' }, { to: `/admin/productimage/edit/${$route.params.id}`, text: 'ویرایش کردن تصویر محصول' }]"
          :fieldsToShow="fieldsToShow[imageData.id]"
          :categoryUpdateActions="categoryUpdateActions"
        />
      </template>
    </div>
    <div v-else>
      <div
        class="d-flex justify-content-center align-items-center"
        style="height: calc(100vh - 200px); flex-direction: column"
      >
        <p style="font-size: 22px">برای این محصول تصویری یافت نشد</p>
        <div class="d-flex">
          <CButton
            name="cil-arrow-left"
            v-bind="{ variant: 'ghost' }"
            @click="$router.go(-1)"
            class="d-flex justify-content-center align-items-center"
          >
            <span class="d-block mx-2" style="font-size: 16px">بازگشت</span>
            <CIcon size="xl" name="cil-arrow-left" />
          </CButton>
          <CButton
            name="cil-image"
            v-bind="{ variant: 'ghost' }"
            :to="`/admin/productimage/add?prodID=${$route.params.id}`"
            class="d-flex justify-content-center align-items-center"
          >
            <span class="d-block mx-2" style="font-size: 16px"
              >ثبت عکس جدید</span
            >
            <CIcon size="xl" name="cil-image" />
          </CButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOne, remove } from "@/services/product/images";
import showPageMixin from "@/mixins/showPage";
import ShowDataCard from "@/components/base/ShowDataCard.vue";
import { properStatus } from "@/utils";
export default {
  mixins: [showPageMixin],
  components: { ShowDataCard },
  data() {
    return {
      properStatus,
      deleteMethod: remove,
      categoryUpdateActions: ["fetchProducts", 'fetchProductImageTypes'],
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
            data: "http://admin.aptar.ir" + imageData.thumbnail,
            col: "12",
          },
        ];
      }
      return fileds;
    },
  },
};
</script>
