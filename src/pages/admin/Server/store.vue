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
            addNewLink="/admin/server/add"
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
import { update, getAll, remove } from "../../../services/server";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { DefaultTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
      deleteInfoMethod: remove,
      deleteIdField: "serverID",
      keysToPost: [
        "title",
        "loadBalance",
        "address",
        "ip",
        "macAddress",
        "version",
        "isActive",
        "serverID",
      ],
      showColumns: [
        { key: "index", label: "#", _style: "width: 10px" },
        { key: "title", label: "عنوان" },
        { key: "loadBalance", label: "لود بالانس" },
        { key: "address", label: "آدرس" },
        { key: "ip", label: "آی پی" },
        { key: "macAddress", label: "آدرس فیزیکی" },
        { key: "version", label: "ورژن", _style: "width: 10px" },
        { key: "isActive", label: "فعال" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "سرورها",
    };
  },
  methods: {
    moreAction({ serverID: id }) {
      this.$router.push({ name: "showServer", params: { id } });
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
      } catch (ex) {
        console.log(ex);
      }
    },
    editAction({ serverID: id }) {
      this.$router.push({ name: "editServer", params: { id } });
    },
  },
};
</script>