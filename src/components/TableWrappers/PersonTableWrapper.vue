<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <CIcon name="cil-grid" />
            {{ caption }}
          </div>
          <CButton
            color="success"
            size="sm"
            class="m-2"
            link
            exact
            to="/admin/person/add"
          >
            <CIcon name="cil-user-plus" class="ml-1" />
            اضافه کردن اکانت جدید
          </CButton>
        </div>
      </slot>
    </CCardHeader>
    <CCardBody style="max-height: calc(100vh - 240px); overflow: auto">
      <CDataTable
        v-if="showTable"
        class="aptar-table-wrapper"
        :hover="hover"
        :striped="striped"
        :border="border"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :activePage="1"
        :items-per-page="itemsPerPage"
        :dark="dark"
        :pagination="pagination"
        responsive
        :sorter="{ external: true, resetable: true }"
        :columnFilter="{ external: true, lazy: true, CreateDate: '' }"
        :noItemsView="{
          noResults: 'دیتایی برای نمایش یافت نشد',
          noItems: 'دیتایی برای نمایش وجود ندارد',
        }"
        @page-change="pageChange"
        @update:sorter-value="sorterChange"
        @update:table-filter-value="tableFilterChange"
        @update:column-filter-value="columnFilterChange"
      >
        <template #actions="{ item }">
          <td>
            <CButton
              name="cil-pencil"
              @click="$emit('edit-action', item)"
              size="sm"
              v-bind="{ variant: 'ghost' }"
              color="info"
              class="btn-brand"
            >
              <CIcon size="sm" name="cil-pencil" />
            </CButton>
            <CButton
              name="cil-options"
              size="sm"
              v-bind="{ variant: 'ghost' }"
              @click="$emit('more-action', item)"
              color="info"
              class="btn-brand"
            >
              <CIcon size="sm" name="cil-options" />
            </CButton>
          </td>
        </template>
        <template #index="{ index }">
          <td>
            {{ index + 1 }}
          </td>
        </template>
        <template #index-filter>
          <CButton color="danger" size="sm" @click="clearAllFilters">
            <CIcon name="cil-filter-x" class="ml-1" />
          </CButton>
        </template>
        <template #isActive="{ item }">
          <td>
            <CSwitch
              class="mr-2"
              :checked="item.isActive"
              color="success"
              v-bind="{ variant: '3d' }"
              value="success"
              @update:checked="
                (status) =>
                  $emit('toggle-user-account-state', { status, userData: item })
              "
            />
          </td>
        </template>
        <template #isActive-filter>
          <CSwitch
            class="mr-2"
            :checked="isActiveColumnFilter"
            color="success"
            v-bind="{ variant: '3d' }"
            value="success"
            @update:checked="(status) => (isActiveColumnFilter = status)"
          />
        </template>
        <template #createDate-filter>
          <TheDatePickerFilter
            column="createDate"
            @filter-changed="(data) => changeDateFilter(data)"
          />
        </template>
        <template #createDate="{ item }">
          <td>
            {{
              item.createDate
                ? new Date(item.createDate).toLocaleString("fa-IR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : ""
            }}
          </td>
        </template>
        <template #under-table>
          <CSelect
            placeholder=""
            style="height: 32px; width: 70px; margin: 5"
            :value="itemsPerPage"
            :options="[5, 10, 15, 25, 50]"
            @update:value="(val) => (itemsPerPage = val)"
          />
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import TheDatePickerFilter from "../base/TheDatePickerFilter.vue";
export default {
  components: { TheDatePickerFilter },
  name: "Table",
  props: {
    items: Array,
    fields: {
      required: true,
      type: Array,
    },
    caption: {
      type: String,
      default: "Table",
    },
    hover: Boolean,
    striped: Boolean,
    border: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean,
    deleteIdField: String,
  },
  data() {
    return {
      range: [],
      itemsPerPage: 10,
      pagination: true,
      showTable: true,
      columnFilters: null,
      isActiveColumnFilter: false,
    };
  },
  watch: {
    itemsPerPage(newVal) {
      this.itemsPerPage = newVal;
      this.showTable = false;
      setTimeout(() => {
        this.showTable = true;
      }, 300);
      this.$emit("page-change", 1);
      this.$emit("pagination-change", newVal);
    },
    range(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.createDate = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
    isActiveColumnFilter(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.isActive = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
  },
  methods: {
    changeDateFilter(data) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.createDate = data;
      this.$emit("column-filter-change", this.columnFilters);
    },
    pageChange(pageNumber) {
      this.$emit("page-change", pageNumber);
    },
    paginationChange(itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
      this.$emit("pagination-change", itemsPerPage);
    },
    sorterChange({ asc, column }) {
      this.$emit("sorter-change", { asc, column });
    },
    tableFilterChange(keyword) {
      this.$emit("table-filter-change", keyword);
    },
    columnFilterChange(keyWordsMappedWithColumnNamesObject) {
      this.columnFilters = keyWordsMappedWithColumnNamesObject;
      this.$emit("column-filter-change", keyWordsMappedWithColumnNamesObject);
    },
    clearAllFilters() {
      const eve = new Event("clearAllDataGridFilters");
      window.dispatchEvent(eve);
    },
  },
};
</script>

<style lang="scss">
.vpd-input-group input:not(.vpd-is-editable) {
  height: 29px;
}

.vpd-input-group input {
  border: 1px solid #dadada;
  border-radius: 0.25rem;
}

.vpd-input-group label {
  display: none;
}

.aptar-table-wrapper {
  .form-group {
    display: inline-block;
    margin-left: 8px;
  }

  nav {
    display: inline-block;
  }
}
</style>
