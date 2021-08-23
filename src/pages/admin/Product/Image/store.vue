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
            @page-change="pageChange"
            @sorter-change="sorterChange"
            @column-filter-change="columnFilterChange"
            @more-action="moreAction"
            @toggle-data-state="updateAction"
            @edit-action="editAction"
          />
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>

<script>
import ProductImageTableWrapper from "@/components/TableWrappers/ProductImageTableWrapper.vue";
import { catalog } from "@/services/product";
import storePageMixin from "@/mixins/storePage";
export default {
  components: { ProductImageTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: catalog,
      keysToPost: ["fileOption", "id", "file", "priority"],
      showColumns: [
        { key: "index", label: "#" },
        { key: "id", label: "کد" },
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