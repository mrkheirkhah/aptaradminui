<template>
  <div>
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
                name="cil-settings"
                size="sm"
                v-bind="{ variant: 'ghost' }"
                @click="() => showDetailsAction(item.orderID)"
                color="info"
                class="btn-brand"
              >
                <CIcon size="sm" name="cil-settings" />
              </CButton>
              <CButton
                name="cil-print"
                size="sm"
                v-bind="{ variant: 'ghost' }"
                :to="`/admin/invoice/${item.orderID}`"
                color="info"
                class="btn-brand"
              >
                <CIcon size="sm" name="cil-print" />
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
          <template #date-filter>
            <TheDatePickerFilter
              column="date"
              @filter-changed="(data) => changeDateFilter(data)"
            />
          </template>
          <template #date="{ item }">
            <td>
              {{
                item.date
                  ? new Date(item.date).toLocaleString("fa-IR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : ""
              }}
            </td>
          </template>
          <template #personID="{ item }">
            <td>
              {{ personsObjectMappedById[item.personID] }}
            </td>
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
          <template #orderPayTypeID="{ item }">
            <td>
              {{ orderPayTypesObjectMappedById[item.orderPayTypeID] }}
            </td>
          </template>
          <template #orderPayTypeID-filter>
            <CSelect
              placeholder=""
              style="height: 32px; width: 100%; margin: auto"
              :value="orderPayTypeID"
              :options="[{ value: '', label: '...' }, ...orderPayTypesArray]"
              @update:value="(id) => (orderPayTypeID = id)"
            />
          </template>
          <template #orderStatusID="{ item }">
            <td>
              {{ orderStatusesObjectMappedById[item.orderStatusID] }}
            </td>
          </template>
          <template #orderStatusID-filter>
            <CSelect
              placeholder=""
              style="height: 32px; width: 100%; margin: auto"
              :value="orderStatusID"
              :options="[{ value: '', label: '...' }, ...orderStatusesArray]"
              @update:value="(id) => (orderStatusID = id)"
            />
          </template>
          <template #creditAmount="{ item }">
            <td>{{ (+item.creditAmount).toLocaleString() }}</td>
          </template>
          <template #amount="{ item }">
            <td>{{ (+item.amount).toLocaleString() }}</td>
          </template>
          <template #pureAmount="{ item }">
            <td>{{ (+item.pureAmount).toLocaleString() }}</td>
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
    <CModal
      @update:show="
        (val) => {
          if (!val) {
            orderDetails = [];
            orderOptions = [];
          }
        }
      "
      :closeOnBackdrop="true"
      :backdrop="true"
      title="جزئیات سفارش"
      :show.sync="showOrderDetailsModal"
    >
      <CRow>
        <template v-for="detail in orderDetails">
          <CCol sm="12" :key="detail.orderDetailID">
            <CCard class="mb-0">
              <CButton
                color="info"
                @click="accordion = accordion === 2 ? false : 2"
                class="text-right"
              >
                <CRow>
                  <CCol sm="4">
                    <small class="">قیمت</small><br />
                    <strong>{{
                      detail.price ? detail.price.toLocaleString() : ""
                    }}</strong>
                    <br />
                    <small class="">اشتراک:</small><br />
                    <strong>{{ detail.subscriptionTitle }}</strong>
                  </CCol>
                  <CCol sm="4"
                    ><small class="">وضعیت جزئیات</small><br />
                    <strong>{{ detail.detailStatus.title }}</strong> <br />
                    <small class="">تعداد:</small><br />
                    <strong>{{ detail.quantity }}</strong></CCol
                  >
                  <CCol sm="4"
                    ><small class="">محصول</small><br />
                    <strong>{{ detail.productPrice.product.title }}</strong>
                    <br />
                    <small class="">مقدار اعتبار:</small><br />
                    <strong>{{ detail.creditAmount }}</strong></CCol
                  >
                  <CCol sm="2"> </CCol>
                </CRow>
              </CButton>
              <CCollapse :show="accordion === 2">
                <CCardBody
                  style="max-height: calc(100vh - 240px); overflow: auto"
                >
                  <CListGroup>
                    <template v-for="option in orderOptions">
                      <CListGroupItem
                        href="#"
                        active
                        class="flex-column align-items-start my-2"
                        :key="option.productOption.option.optionID"
                      >
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">
                            {{ option.productOption.option.optionType.title }}
                          </h5>
                          <small>
                            {{ option.productOption.option.title }}
                          </small>
                          <small>
                            {{
                              option.productOption.price
                                ? option.productOption.price.toLocaleString()
                                : ""
                            }}
                          </small>
                        </div>
                      </CListGroupItem>
                    </template>
                  </CListGroup>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CCol>
        </template>
      </CRow>
      <template #footer>
        <CButton
          color="secondary"
          class="m-2"
          @click="showOrderDetailsModal = false"
        >
          بستن
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import { getOptions, getDetails } from "../../services/order";
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
  },
  data() {
    return {
      showTable: true,
      itemsPerPage: 10,
      personID: Number.NaN,
      orderPayTypeID: Number.NaN,
      orderStatusID: Number.NaN,
      range: [],
      accordion: 0,
      orderDetails: [],
      orderOptions: [],
      columnFilters: null,
      isActiveColumnFilter: false,
      showOrderDetailsModal: false,
    };
  },
  computed: {
    orderPayTypesObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.orderPayTypesArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      return optionTypesObject;
    },
    orderStatusesObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.orderStatusesArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      return optionTypesObject;
    },
    personsObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.personsArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      return optionTypesObject;
    },
    orderPayTypesArray() {
      return this.$store.state.orderPayTypesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    orderStatusesArray() {
      return this.$store.state.orderStatusesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
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
    orderPayTypeID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.orderPayTypeID = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
    orderStatusID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.orderStatusID = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
    personID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.personID = newVal;
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
    async showOptionsAction() {},
    async fetchOptions(detailID) {
      const self = this;
      try {
        const { data } = await getOptions(detailID);
        self.orderOptions = [...data];
      } catch (ex) {
        console.log(ex);
      }
    },
    async showDetailsAction(orderID) {
      const self = this;
      try {
        const { data } = await getDetails(orderID);
        self.orderDetails = [...data];
        self.fetchOptions(data[0].orderDetailID);
        self.showOrderDetailsModal = true;
      } catch (ex) {
        console.log(ex);
      }
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
