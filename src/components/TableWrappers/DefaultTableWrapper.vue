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
            <CIcon v-if="iconName" :name="iconName" class="ml-1" />
            اضافه کردن {{ caption }} جدید
          </CButton>
        </div>
      </slot>
    </CCardHeader>
    <CCardBody style="max-height: calc(100vh - 240px); overflow: auto">
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
                (status) => $emit('toggle-data-state', { status, data: item })
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
        <template #price="{ item }">
          <td>{{ (+item.price).toLocaleString() }}</td>
        </template>
        <template #optionTypeID="{ item }">
          <td>{{ optionTypesObjectMappedById[item.optionTypeID] }}</td>
        </template>
        <template #optionTypeID-filter>
          <CSelect
            placeholder=""
            style="height: 32px; width: 100%; margin: auto"
            :value="optionTypeID"
            :options="[{ value: '', label: '...' }, ...optionTypesArray]"
            @update:value="(id) => (optionTypeID = id)"
          />
        </template>
        <template #subscriptionTypeID="{ item }">
          <td>
            {{ subscriptionTypesObjectMappedById[item.subscriptionTypeID] }}
          </td>
        </template>
        <template #subscriptionTypeID-filter>
          <CSelect
            placeholder=""
            style="height: 32px; width: 100%; margin: auto"
            :value="subscriptionTypeID"
            :options="[{ value: '', label: '...' }, ...subscriptionTypesArray]"
            @update:value="(id) => (subscriptionTypeID = id)"
          />
        </template>
        <template #realPrice="{ item }">
          <td>{{ (+item.realPrice).toLocaleString() }}</td>
        </template>
        <template #productID="{ item }">
          <td>
            {{ productsObjectMappedById[item.productID] }}
          </td>
        </template>
        <template #productID-filter>
          <CSelect
            placeholder=""
            style="height: 32px; width: 100%; margin: auto"
            :value="productID"
            :options="[{ value: '', label: '...' }, ...productsArray]"
            @update:value="(id) => (productID = id)"
          />
        </template>
        <template #payTypeID="{ item }">
          <td>
            {{ payTypesObjectMappedById[item.payTypeID] }}
          </td>
        </template>
        <template #payTypeID-filter>
          <CSelect
            placeholder=""
            style="height: 32px; width: 100%; margin: auto"
            :value="payTypeID"
            :options="[{ value: '', label: '...' }, ...payTypesArray]"
            @update:value="(id) => (payTypeID = id)"
          />
        </template>
        <template #subscriptionID="{ item }">
          <td>
            {{ subscriptionsObjectMappedById[item.subscriptionID] }}
          </td>
        </template>
        <template #subscriptionID-filter>
          <CSelect
            style="height: 32px; width: 100%; margin: auto"
            :value="subscriptionID"
            :options="[{ value: '', label: '...' }, ...subscriptionsArray]"
            @update:value="(id) => (subscriptionID = id)"
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
    addNewLink: String,
    deleteIdField: String,
    iconName: String,
  },
  data() {
    return {
      itemsPerPage: 10,
      showTable: true,
      optionTypeID: Number.NaN,
      productID: Number.NaN,
      subscriptionID: Number.NaN,
      payTypeID: Number.NaN,
      subscriptionTypeID: Number.NaN,
      range: [],
      columnFilters: null,
      isActiveColumnFilter: false,
    };
  },
  computed: {
    optionTypesObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.optionTypesArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      return optionTypesObject;
    },
    optionTypesObjectMappedByName() {
      const optionTypesObject = {};
      this.$store.state.optionTypesArray.map((stateObj) => {
        optionTypesObject[stateObj.title] = stateObj.id;
      });
      return optionTypesObject;
    },
    optionTypesArray() {
      return this.$store.state.optionTypesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    subscriptionTypesObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.subscriptionTypesArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      return optionTypesObject;
    },
    subscriptionTypesObjectMappedByName() {
      const optionTypesObject = {};
      this.$store.state.subscriptionTypesArray.map((stateObj) => {
        optionTypesObject[stateObj.title] = stateObj.id;
      });
      return optionTypesObject;
    },
    subscriptionTypesArray() {
      return this.$store.state.subscriptionTypesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
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
    payTypesArray() {
      return this.$store.state.payTypesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    payTypesObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.payTypesArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      return optionTypesObject;
    },
    subscriptionsArray() {
      return this.$store.state.subscriptionsArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    subscriptionsObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.subscriptionsArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      return optionTypesObject;
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
    isActiveColumnFilter(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.isActive = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
    optionTypeID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.optionTypeID = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
    subscriptionTypeID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.subscriptionTypeID = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
    payTypeID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.payTypeID = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
    subscriptionID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.subscriptionID = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
    productID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.productID = newVal;
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
