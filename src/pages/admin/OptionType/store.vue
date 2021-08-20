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
import { update, getAll } from "../../../services/option/type";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { DefaultTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
      keysToPost: ["title", "optionTypeID"],
      showColumns: [
        { key: "index", label: "#" },
        { key: "optionTypeID", label: "کد" },
        { key: "title", label: "نام" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "نوع تنظیمات",
    };
  },
  methods: {
    moreAction({ optionTypeID: id }) {
      this.$router.push({ name: "showOptionType", params: { id } });
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
    editAction({ optionTypeID: id }) {
      this.$router.push({ name: "editOptionType", params: { id } });
    },
  },
};
</script>