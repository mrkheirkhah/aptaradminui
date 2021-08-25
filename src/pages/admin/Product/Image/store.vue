<template>
  <CRow>
    <CCol md="12">
      <CRow>
        <CCol sm="12">
          <ProductImageTableWrapper
            :items="getGridData"
            :fields="getGridFields"
            hover
            striped
            border
            small
            fixed
            :caption="gridTitle"
            addNewLink="/admin/productimage/add"
            @pagination-change="paginationChange"
            @page-change="pageChange"
            @sorter-change="sorterChange"
            @column-filter-change="columnFilterChange"
            @more-action="moreAction"
            @toggle-data-state="updateAction"
            @edit-action="editAction"
            @delete-action="deleteInfo"
          />
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>

<script>
import ProductImageTableWrapper from "@/components/TableWrappers/ProductImageTableWrapper.vue";
import { catalog, removeProduct } from "@/services/product";
import storePageMixin from "@/mixins/storePage";
export default {
  components: { ProductImageTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: catalog,
      deleteInfoMethod: removeProduct,
      deleteIdField: "id",
      keysToPost: ["fileOption", "id", "file", "priority"],
      showColumns: [
        { key: "index", label: "#" },
        { key: "title", label: "نام" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "لیست محصولات (تصویر محصولات)",
    };
  },
  methods: {
    moreAction({ id }) {
      this.$router.push({ name: "showProductImage", params: { id } });
    },
    updateAction() {
      alert("امكان ويرايش وجود ندارد");
    },
    editAction() {
      alert("امكان ويرايش وجود ندارد");
    },
  },
};
</script>