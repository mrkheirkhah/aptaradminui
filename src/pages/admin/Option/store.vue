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
            addNewLink="/admin/option/add"
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
import { update, getAll } from "../../../services/option";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { DefaultTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
      keysToPost: ["title", "value", "optionID", "optionTypeID", "isActive"],
      showColumns: [
        { key: "index", label: "#" },
        { key: "optionID", label: "کد" },
        { key: "title", label: "نام" },
        { key: "value", label: "مقدار" },
        { key: "optionTypeID", label: "نوع تنظیمات" },
        { key: "isActive", label: "فعال" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "تنظیمات",
    };
  },
  methods: {
    moreAction({ optionID: id }) {
      this.$router.push({ name: "showOption", params: { id } });
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
    editAction({ optionID: id }) {
      this.$router.push({ name: "editOption", params: { id } });
    },
  },
};
</script>