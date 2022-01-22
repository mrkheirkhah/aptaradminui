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
import DefaultTableWrapper from "@/components/TableWrappers/DefaultTableWrapper.vue";
import { update, getAll, remove } from "@/services/product/prices";
import storePageMixin from "@/mixins/storePage";
export default {
  components: { DefaultTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
      deleteInfoMethod: remove,
      deleteIdField: "productPriceID",
      categoryUpdateActions: ["fetchProducts"],
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
        { key: "index", label: "#", _style: "width: 10px" },
        { key: "productID", label: "محصول" },
        { key: "subscriptionID", label: "اشتراک" },
        { key: "price", label: "قیمت" },
        { key: "realPrice", label: "قیمت واقعی" },
        { key: "payTypeID", label: "نوع پرداخت" },
        { key: "priority", label: "اولویت", _style: "width: 20px" },
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
      const clonedData = { ...data };
      for (const key in clonedData) {
        if (clonedData[key] === "") clonedData[key] = null;
        if (!this.keysToPost.includes(key)) {
          delete clonedData[key];
        }
      }
      try {
        await update({ ...clonedData });
        this.updateCategoriesIfHave();
      } catch (ex) {
        console.log(ex);
      }
    },
    editAction({ productPriceID: id }) {
      this.$router.push({ name: "editProductPrice", params: { id } });
    },
  },
};
</script>
