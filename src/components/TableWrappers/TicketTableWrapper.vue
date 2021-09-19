<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <CIcon name="cil-tags" />
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
            <CIcon name="cil-tags" class="ml-1" />
            اضافه کردن {{ caption }} جدید
          </CButton>
        </div>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        v-if="showTable"
        :hover="hover"
        class="aptar-table-wrapper"
        :striped="striped"
        :border="border"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :items-per-page="itemsPerPage"
        :dark="dark"
        pagination
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
          </td>
        </template>
        <template #index="{ index }">
          <td>
            {{ index + 1 }}
          </td>
        </template>
        <template #updateDate-filter>
          <date-picker
            range
            clearable
            locale="fa"
            format="YYYY-MM-DD HH:mm"
            display-format="jYYYY/jM/jD"
            label=""
            v-model="range"
          />
        </template>
        <template #updateDate="{ item }">
          <td>
            {{
              item.updateDate
                ? new Date(item.updateDate).toLocaleString("fa-IR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : ""
            }}
          </td>
        </template>
        <template #personID="{ item }">
          <td>{{ personsObjectMappedById[item.personID] }}</td>
        </template>
        <template #personID-filter>
          <CSelect
            placeholder=""
            style="height: 32px; width: 100%; margin: auto"
            :value="personID"
            :options="[{ value: '', label: '...' }, ...personsArray]"
            @update:value="(id) => (personID = id)"
          />
        </template>
        <template #ticketStatusID="{ item }">
          <td>
            {{ ticketStatusesObjectMappedById[item.ticketStatusID] }}
          </td>
        </template>
        <template #ticketStatusID-filter>
          <CSelect
            placeholder=""
            style="height: 32px; width: 100%; margin: auto"
            :value="ticketStatusID"
            :options="[{ value: '', label: '...' }, ...ticketStatusTypesArray]"
            @update:value="(id) => (ticketStatusID = id)"
          />
        </template>
        <template #ticketCategoryID="{ item }">
          <td>
            {{ ticketCategoriesObjectMappedById[item.ticketCategoryID] }}
          </td>
        </template>
        <template #ticketCategoryID-filter>
          <CSelect
            placeholder=""
            style="height: 32px; width: 100%; margin: auto"
            :value="ticketCategoryID"
            :options="[{ value: '', label: '...' }, ...ticketCategoriesArray]"
            @update:value="(id) => (ticketCategoryID = id)"
          />
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
      showTable: true,
      itemsPerPage: 10,
      personID: Number.NaN,
      ticketStatusID: Number.NaN,
      ticketCategoryID: Number.NaN,
      range: [],
      columnFilters: null,
      isActiveColumnFilter: false,
    };
  },
  computed: {
    ticketStatusesObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.ticketStatusesArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      return optionTypesObject;
    },
    ticketCategoriesObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.ticketCategoriesArray.map((stateObj) => {
        optionTypesObject[stateObj.ticketCategoryID] = stateObj.title;
      });
      return optionTypesObject;
    },
    personsObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.personsArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      debugger;
      return optionTypesObject;
    },
    ticketStatusTypesArray() {
      return this.$store.state.ticketStatusesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    ticketCategoriesArray() {
      return this.$store.state.ticketCategoriesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.ticketCategoryID,
      }));
    },
    personsArray() {
      return this.$store.state.personsArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
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
    ticketStatusID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.ticketStatusID = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
    ticketCategoryID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.ticketCategoryID = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
    personID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.personID = newVal;
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
      this.columnFilters = keyWordsMappedWithColumnNamesObject;
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