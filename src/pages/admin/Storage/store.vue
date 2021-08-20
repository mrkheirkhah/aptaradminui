<template>
  <CRow>
    <CCol md="12">
      <CRow>
        <CCol sm="12">
          <PersonTableWrapper
            :items="getGridData"
            :fields="getGridFields"
            hover
            striped
            border
            small
            fixed
            :caption="gridTitle"
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
import { getAllPersons } from "@/services/person";
import PersonTableWrapper from "@/components/TableWrappers/PersonTableWrapper.vue";
import { updatePerson } from "../../../services/person";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { PersonTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAllPersons,
      keysToPost: [
        "userName",
        "password",
        "firstName",
        "lastName",
        "caption",
        "nationalCode",
        "email",
        "phone",
        "mobile",
        "zipCode",
        "stateID",
        "address",
        "isActive",
        "personID",
      ],
      showColumns: [
        { key: "index", label: "#" },
        { key: "personID", label: "کد" },
        { key: "userName", label: "نام کاربری" },
        { key: "firstName", label: "نام" },
        { key: "lastName", label: "نام خانوادگی" },
        { key: "nationalCode", label: "کد ملی" },
        { key: "email", label: "ایمیل" },
        { key: "mobile", label: "تلفن همراه" },
        { key: "phone", label: "تلفن" },
        { key: "isActive", label: "فعال" },
        { key: "createDate", label: "تاریخ ثبت‌ نام" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "کاربرها",
    };
  },
  methods: {
    moreAction({ personID: id }) {
      this.$router.push({ name: "showPerson", params: { id } });
    },
    async updateAction({ userData, status }) {
      userData.isActive = status;
      for (const key in userData) {
        if (!this.keysToPost.includes(key)) {
          delete userData[key];
        }
      }
      try {
        await updatePerson({ ...userData });
      } catch (ex) {}
    },
    editAction({ personID: id }) {
      this.$router.push({ name: "editPerson", params: { id } });
    },
  },
};
</script>