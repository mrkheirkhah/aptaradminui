<template>
  <CRow>
    <CCol md="12">
      <CRow>
        <CCol sm="12">
          <DefaultTableWrapper
            :items="getGridData"
            :fields="getGridFields"
            hover
            striped
            border
            small
            fixed
            :caption="gridTitle"
            addNewLink="/admin/productprice/add"
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
import DefaultTableWrapper from "@/components/TableWrappers/DefaultTableWrapper.vue";
import { update, getAll } from "@/services/product/prices";
import storePageMixin from "@/mixins/storePage";
export default {
  components: { DefaultTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
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
      showColumns: [
        { key: "index", label: "#" },
        { key: "productPriceID", label: "کد" },
        { key: "price", label: "قیمت" },
        { key: "realPrice", label: "قیمت واقعی" },
        { key: "priority", label: "اولویت" },
        { key: "isActive", label: "فعال" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "قیمت محصول",
    };
  },
  methods: {
    moreAction({ productPriceID: id }) {
      this.$router.push({ name: "showProductPrice", params: { id } });
    },
    async updateAction({ data, status }) {
      data.isActive = status;
      for (const key in data) {
        if (!this.keysToPost.includes(key)) {
          delete data[key];
        }
      }
      try {
        await update({ ...data });
      } catch (ex) {}
    },
    editAction({ productPriceID: id }) {
      this.$router.push({ name: "editProductPrice", params: { id } });
    },
  },
};
</script>