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
            addNewLink="/admin/category/add"
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
import { update, getAll } from "../../../services/category";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { DefaultTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
      keysToPost: ["title", "isActive", "categoryID"],
      showColumns: [
        { key: "index", label: "#" },
        { key: "categoryID", label: "کد" },
        { key: "title", label: "نام" },
        { key: "isActive", label: "فعال" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "دسته بندی‌ها",
    };
  },
  methods: {
    moreAction({ categoryID: id }) {
      this.$router.push({ name: "showCategory", params: { id } });
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
    editAction({ categoryID: id }) {
      this.$router.push({ name: "editCategory", params: { id } });
    },
  },
};
</script>