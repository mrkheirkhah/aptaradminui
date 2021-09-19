<template>
  <CRow>
    <CCol md="12">
      <CRow>
        <CCol sm="12">
          <TicketTableWrapper
            :items="getGridData"
            :fields="getGridFields"
            hover
            striped
            border
            small
            fixed
            :caption="gridTitle"
            @page-change="pageChange"
            @pagination-change="paginationChange"
            @sorter-change="sorterChange"
            @column-filter-change="columnFilterChange"
            @more-action="moreAction"
            @toggle-data-state="updateAction"
            @edit-action="editAction"
            @reply-action="replyAction"
            @delete-action="deleteInfo"
          />
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>

<script>
import TicketTableWrapper from "@/components/TableWrappers/TicketTableWrapper.vue";
import { getAll } from "../../../services/ticket";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { TicketTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
      deleteIdField: "categoryID",
      keysToPost: ["title", "isActive", "categoryID"],
      showColumns: [
        { key: "index", label: "#", _style: "width: 10px" },
        { key: "title", label: "عنوان" },
        { key: "personID", label: "کاربر" },
        { key: "ticketStatusID", label: "وضعیت" },
        { key: "ticketCategoryID", label: "دسته‌بندی" },
        { key: "updateDate", label: "تاریخ دریافت" },
        { key: "actions", label: "عملیات", _style: "width: 100px" },
      ],
      gridTitle: "تیکت‌ها",
    };
  },
  methods: {
    moreAction() {
      alert("not availible");
    },
    async updateAction() {
      alert("not availible");
    },
    editAction({ ticketID: id }) {
      this.$router.push({ name: "editTicket", params: { id } });
    },
    replyAction({ ticketID: id }) {
      this.$router.push({ name: "replyTicket", params: { id } });
    },
  },
};
</script>