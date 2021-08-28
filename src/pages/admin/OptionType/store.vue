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
            addNewLink="/admin/optiontype/add"
            @page-change="pageChange"
            @pagination-change="paginationChange"
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
import { update, getAll, remove } from "../../../services/option/type";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { DefaultTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      deleteInfoMethod: remove,
      fetchAll: getAll,
      deleteIdField: "optionTypeID",
      keysToPost: ["title", "optionTypeID"],
      showColumns: [
        { key: "index", label: "#" },
        { key: "title", label: "نام" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "نوع آپشن",
    };
  },
  methods: {
    moreAction({ optionTypeID: id }) {
      this.$router.push({ name: "showOptionType", params: { id } });
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
      } catch (ex) {}
    },
    editAction({ optionTypeID: id }) {
      this.$router.push({ name: "editOptionType", params: { id } });
    },
  },
};
</script>