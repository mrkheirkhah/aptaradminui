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
            @page-change="pageChange"
            @sorter-change="sorterChange"
            @column-filter-change="columnFilterChange"
            @more-action="moreAction"
            @toggle-user-account-state="updateAction"
            @edit-action="editAction"
          />
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>

<script>
import DefaultTableWrapper from "@/components/TableWrappers/DefaultTableWrapper.vue";
import { update, getAll } from "../../../services/server";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { DefaultTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
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
        { key: "index", label: "#" },
        { key: "serverID", label: "کد" },
        { key: "loadBalance", label: "لود بالانس" },
        { key: "address", label: "آدرس" },
        { key: "ip", label: "آی پی" },
        { key: "macAddress", label: "آدرس فیزیکی" },
        { key: "version", label: "ورژن" },
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
      for (const key in data) {
        if (!this.keysToPost.includes(key)) {
          delete data[key];
        }
      }
      try {
        await update({ ...data });
      } catch (ex) {}
    },
    editAction({ serverID: id }) {
      this.$router.push({ name: "editServer", params: { id } });
    },
  },
};
</script>