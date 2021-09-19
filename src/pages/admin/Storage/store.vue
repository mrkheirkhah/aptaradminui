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
            addNewLink="/admin/storage/add"
            @pagination-change="paginationChange"
            @page-change="pageChange"
            @sorter-change="sorterChange"
            @column-filter-change="columnFilterChange"
            @more-action="moreAction"
            @toggle-user-account-state="updateAction"
            @edit-action="editAction"
            @delete-action="deleteInfo"
          />
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>

<script>
import { getAll, remove, update } from "@/services/storage";
import DefaultTableWrapper from "@/components/TableWrappers/DefaultTableWrapper.vue";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { DefaultTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
      deleteInfoMethod: remove,
      deleteIdField: "storageID",
      keysToPost: [
        "title",
        "price",
        "value",
        "enable",
        "timePeriod",
        "storageID",
      ],
      showColumns: [
        { key: "index", label: "#" },
        { key: "title", label: "نام" },
        { key: "price", label: "قیمت" },
        { key: "value", label: "مقدار" },
        { key: "enable", label: "فعالیت" },
        { key: "timePeriod", label: "بازه زمانی" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "ذخیره سازی",
    };
  },
  methods: {
    moreAction({ storageID: id }) {
      this.$router.push({ name: "showStorage", params: { id } });
    },
    async updateAction({ data, status }) {
      data.isActive = status;
      for (const key in data) {
        if (data[key] === "") data[key] = null;
        if (!this.keysToPost.includes(key)) {
          delete data[key];
        }
      }
      try {
        await update({ ...data });
      } catch (ex) {
        console.log(ex);
      }
    },
    editAction({ storageID: id }) {
      this.$router.push({ name: "editStorage", params: { id } });
    },
  },
};
</script>