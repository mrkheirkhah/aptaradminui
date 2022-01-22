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
            addNewLink="/admin/subscription/add"
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
import { update, getAll, remove } from "../../../services/subscription";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { DefaultTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
      deleteInfoMethod: remove,
      categoryUpdateActions: ["fetchSubscriptionTypes", "fetchSubscriptions"],
      deleteIdField: "subscriptionID",
      keysToPost: [
        "title",
        "value",
        "subscriptionID",
        "subscriptionTypeID",
        "isActive",
      ],
      showColumns: [
        { key: "index", label: "#" },
        { key: "title", label: "نام" },
        { key: "value", label: "مقدار" },
        { key: "subscriptionTypeID", label: "نوع اشتراک" },
        { key: "isActive", label: "فعال" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "اشتراک",
    };
  },
  methods: {
    moreAction({ subscriptionID: id }) {
      this.$router.push({ name: "showSubscription", params: { id } });
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
        this.updateCategoriesIfHave();
      } catch (ex) {
        console.log(ex);
      }
    },
    editAction({ subscriptionID: id }) {
      this.$router.push({ name: "editSubscription", params: { id } });
    },
  },
};
</script>
