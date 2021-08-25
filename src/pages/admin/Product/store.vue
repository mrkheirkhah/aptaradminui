<template>
  <CRow>
    <CCol md="12">
      <CRow>
        <CCol sm="12">
          <ProductTableWrapper
            :items="getGridData"
            :fields="getGridFields"
            hover
            striped
            border
            small
            fixed
            :caption="gridTitle"
            @page-change="pageChange"
            @pagination-change="paginationChange"
            @sorter-change="sorterChange"
            @column-filter-change="columnFilterChange"
            @more-action="moreAction"
            @toggle-product-state="updateAction"
            @edit-action="editAction"
            @delete-action="deleteInfo"
            @show-setting-action="showSettingAction"
            @show-price-action="showPriceAction"
          />
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>

<script>
import {
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "@/services/product";
import ProductTableWrapper from "@/components/TableWrappers/ProductTableWrapper.vue";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { ProductTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAllProducts,
      deleteInfoMethod: deleteProduct,
      deleteIdField: "productID",
      keysToPost: [
        "title",
        "path",
        "parameter",
        "categoryID",
        "isActive",
        "allSoftware",
        "allowExecuteExe",
        "serverID",
        "hasStock",
        "stock",
        "price",
        "shortDescription",
        "longDescription",
        "softwareName",
        "softwareInstalledPath",
        "productID",
      ],
      showColumns: [
        { key: "index", label: "#", _style: "width: 10px" },
        { key: "productID", label: "کد محصول", _style: "width: 10px" },
        { key: "title", label: "نام" },
        { key: "softwareName", label: "نام برنامه" },
        { key: "category", label: "دسته بندی" },
        { key: "path", label: "مسیر" },
        { key: "softwareInstalledPath", label: "مسیر نصب" },
        { key: "parameter", label: "پارامتر" },
        { key: "stock", label: "موجودی", _style: "width: 10px" },
        { key: "price", label: "قیمت" },
        { key: "isActive", label: "وضعیت", _style: "width: 30px" },
        { key: "createDate", label: "تاریخ ایجاد" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "محصولات",
    };
  },

  methods: {
    moreAction({ productID: id }) {
      this.$router.push({ name: "showProduct", params: { id } });
    },
    async updateAction({ productData, status }) {
      productData.isActive = status;
      for (const key in productData) {
        if (!this.keysToPost.includes(key)) {
          delete productData[key];
        }
      }
      try {
        await updateProduct({ ...productData });
      } catch (ex) {}
    },
    editAction({ productID: id }) {
      this.$router.push({ name: "editProduct", params: { id } });
    },
    showSettingAction() {},
    showPriceAction() {},
  },
};
</script>
