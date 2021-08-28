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
            v-if="addNewLink && addNewLink !== ''"
            color="success"
            size="sm"
            class="m-2"
            link
            exact
            :to="addNewLink"
          >
            <CIcon name="cil-user-plus" class="ml-1" />
            اضافه کردن {{ caption }} جدید
          </CButton>
        </div>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :border="border"
        class="aptar-table-wrapper"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :items-per-page="itemsPerPage"
        :dark="dark"
        pagination
        responsive
        :sorter="{ external: true, resetable: true }"
        :columnFilter="{ external: false, lazy: false, CreateDate: '' }"
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
              name="cil-options"
              size="sm"
              v-bind="{ variant: 'ghost' }"
              @click="$emit('more-action', item)"
              color="info"
              class="btn-brand"
            >
              <CIcon size="sm" name="cil-options" />
            </CButton>
            <CButton
              name="cil-trash"
              size="sm"
              v-bind="{ variant: 'ghost' }"
              @click="$emit('delete-action', item)"
              color="danger"
              class="btn-brand"
            >
              <CIcon size="sm" name="cil-trash" />
            </CButton>
          </td>
        </template>
        <template #index="{ index }">
          <td>
            {{ index + 1 }}
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
export default {
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
    addNewLink: String,
    deleteIdField: String,
  },
  data() {
    return {
      itemsPerPage: 10,
      range: [],
      productID: Number.NaN,
    };
  },
  computed: {
    productsArray() {
      return this.$store.state.productsArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    productsObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.productsArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      return optionTypesObject;
    },
  },
  watch: {
    itemsPerPage(newVal) {
      this.itemsPerPage = newVal;
      this.$emit("page-change", 1);
      this.$emit("pagination-change", newVal);
    },
    productID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.productID = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
  },
  methods: {
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
      this.$emit("column-filter-change", keyWordsMappedWithColumnNamesObject);
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