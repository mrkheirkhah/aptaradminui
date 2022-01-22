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
            addNewLink=""
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
import { update, getAll } from "../../../services/pay/type";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { DefaultTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
      deleteInfoMethod: () => alert("امکان حذف وجود ندارد"),
      deleteIdField: "payTypeID",
      keysToPost: ["title", "isActive", "payTypeID"],
      categoryUpdateActions: ["fetchPayTypes"],
      showColumns: [
        { key: "index", label: "#" },
        { key: "title", label: "نام" },
        { key: "isActive", label: "فعال" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "نوع پرداخت",
    };
  },
  methods: {
    moreAction({ payTypeID: id }) {
      this.$router.push({ name: "showPayType", params: { id } });
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
    editAction({ payTypeID: id }) {
      this.$router.push({ name: "editPayType", params: { id } });
    },
  },
};
</script>
