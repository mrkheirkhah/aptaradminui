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
            addNewLink="/admin/productoption/add"
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
import { update, getAll, remove } from "@/services/product/options";
import storePageMixin from "@/mixins/storePage";
export default {
  components: { DefaultTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
      deleteInfoMethod: remove,
      deleteIdField: "productOptionID",
      categoryUpdateActions: ["fetchProducts"],
      keysToPost: [
        "productID",
        "subscriptionID",
        "optionID",
        "price",
        "priority",
        "isActive",
        "productOptionID",
      ],
      showColumns: [
        { key: "index", label: "#", _style: "width: 10px" },
        { key: "title", label: "نام" },
        { key: "productID", label: "محصول" },
        { key: "price", label: "قیمت" },
        { key: "subscriptionID", label: "اشتراک" },
        { key: "priority", label: "اولویت" },
        { key: "isActive", label: "فعال" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "آپشن ها محصول",
    };
  },
  methods: {
    moreAction({ productOptionID: id }) {
      this.$router.push({ name: "showProductOption", params: { id } });
    },
    async updateAction({ data, status }) {
      data.isActive = status;
      const clonedData = { ...data };
      for (const key in clonedData) {
        if (clonedData[key] === "") clonedData[key] = null;
        if (!this.keysToPost.includes(key)) {
          if (clonedData[key] === "") clonedData[key] = null;
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
    editAction({ productOptionID: id }) {
      this.$router.push({ name: "editProductOption", params: { id } });
    },
  },
};
</script>
