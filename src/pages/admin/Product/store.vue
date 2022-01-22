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
      categoryUpdateActions: ["fetchProducts"],
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
        { key: "title", label: "نام" },
        { key: "softwareName", label: "نام برنامه" },
        { key: "categoryID", label: "دسته بندی", _style: "width: 30px" },
        { key: "path", label: "مسیر" },
        { key: "softwareInstalledPath", label: "مسیر نصب" },
        { key: "parameter", label: "پارامتر", _style: "width: 30px" },
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
      const dataToSend = { ...productData };
      dataToSend.isActive = status;
      for (const key in dataToSend) {
        if (dataToSend[key] === "") dataToSend[key] = null;
        if (!this.keysToPost.includes(key)) {
          delete dataToSend[key];
        }
      }
      try {
        await updateProduct({ ...dataToSend });
        this.updateCategoriesIfHave();
      } catch (ex) {
        console.log(ex);
      }
    },
    editAction({ productID: id }) {
      this.$router.push({ name: "editProduct", params: { id } });
    },
  },
};
</script>
