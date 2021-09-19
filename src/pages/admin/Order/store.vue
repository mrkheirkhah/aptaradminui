<template>
  <CRow>
    <CCol md="12">
      <CRow>
        <CCol sm="12">
          <OrderTableWrapper
            :items="getGridData"
            :fields="getGridFields"
            hover
            striped
            border
            small
            fixed
            :caption="gridTitle"
            addNewLink="/admin/order/add"
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
import OrderTableWrapper from "@/components/TableWrappers/OrderTableWrapper.vue";
import { getAll } from "../../../services/order";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { OrderTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
      deleteInfoMethod: null,
      deleteIdField: "orderID",
      keysToPost: [],
      showColumns: [
        { key: "index", label: "#", _style: "width: 10px" },
        { key: "personID", label: "کاربر" },
        { key: "orderStatusID", label: "وضعیت سفارش" },
        { key: "orderPayTypeID", label: "نوع پرداخت" },
        { key: "creditAmount", label: "مقدار اعتبار" },
        { key: "amount", label: "مبلغ کل سفارش" },
        { key: "pureAmount", label: "مبلغ پرداختی" },
        { key: "date", label: "تاریخ پرداخت" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "سفارشات",
    };
  },
  methods: {
    moreAction({ categoryID: id }) {
      this.$router.push({ name: "showCategory", params: { id } });
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
    editAction({ categoryID: id }) {
      this.$router.push({ name: "editCategory", params: { id } });
    },
  },
};
</script>