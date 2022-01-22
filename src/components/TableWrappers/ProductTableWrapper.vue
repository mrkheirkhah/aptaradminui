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
            to="/admin/product/add"
          >
            <CIcon name="cil-basket" class="ml-1" />
            اضافه کردن محصول جدید
          </CButton>
        </div>
      </slot>
    </CCardHeader>
    <CCardBody style="max-height: calc(100vh - 240px); overflow: auto">
      <CDataTable
        v-if="showTable"
        :hover="hover"
        :striped="striped"
        :border="border"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :items-per-page="itemsPerPage"
        :dark="dark"
        class="aptar-table-wrapper"
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
        <template #price="{ item }">
          <td>{{ (+item.price).toLocaleString() }}</td>
        </template>
        <template #actions="{ item }">
          <td>
            <CDropdown color="secondary" togglerText="عملیات">
              <CDropdownToggle color="secondary"
                ><CDropdownMenu>
                  <CDropdownItem
                    @click="$emit('edit-action', item)"
                    color="info"
                  >
                    <CIcon size="sm" name="cil-pencil" /><span
                      class="d-inline-block mr-3"
                      >ویرایش</span
                    >
                  </CDropdownItem>
                  <CDropdownItem
                    @click="$emit('more-action', item)"
                    color="info"
                  >
                    <CIcon size="sm" name="cil-options" />
                    <span class="d-inline-block mr-3"
                      >مشاهده</span
                    ></CDropdownItem
                  >
                  <CDropdownItem
                    @click="$emit('delete-action', item)"
                    color="danger"
                  >
                    <CIcon size="sm" name="cil-trash" /><span
                      class="d-inline-block mr-3"
                      >حذف</span
                    >
                  </CDropdownItem>
                  <CDropdownItem
                    @click="() => showPriceAction(item.productID)"
                    color="info"
                  >
                    <CIcon size="sm" name="cil-dollar" /><span
                      class="d-inline-block mr-3"
                      >قیمت‌ها</span
                    >
                  </CDropdownItem>
                  <CDropdownItem
                    @click="() => showSettingAction(item.productID)"
                    color="info"
                  >
                    <CIcon size="sm" name="cil-settings" />
                    <span class="d-inline-block mr-3"
                      >آپشن‌ها</span
                    ></CDropdownItem
                  >
                  <CDropdownItem
                    @click="() => showImageAction(item.productID)"
                    color="info"
                  >
                    <CIcon size="sm" name="cil-image" /><span
                      class="d-inline-block mr-3"
                      >تصویر‌ها</span
                    >
                  </CDropdownItem>
                  <CDropdownItem
                    class="add-action-button"
                    :to="`/admin/productprice/add?prodID=${item.productID}`"
                    color="info"
                  >
                    <CIcon size="sm" name="cil-dollar" />
                    <span class="d-inline-block mr-3"
                      >اضافه کردن قیمت</span
                    ></CDropdownItem
                  >
                  <CDropdownItem
                    class="add-action-button"
                    :to="`/admin/productoption/add?prodID=${item.productID}`"
                    color="info"
                  >
                    <CIcon size="sm" name="cil-settings" />
                    <span class="d-inline-block mr-3"
                      >اضافه کردن آپشن</span
                    ></CDropdownItem
                  >
                  <CDropdownItem
                    class="add-action-button"
                    :to="`/admin/productimage/add?prodID=${item.productID}`"
                    color="info"
                  >
                    <CIcon size="sm" name="cil-image" /><span
                      class="d-inline-block mr-3"
                      >اضافه کردن تصویر</span
                    >
                  </CDropdownItem>
                </CDropdownMenu></CDropdownToggle
              >
            </CDropdown>
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
                  $emit('toggle-product-state', { status, productData: item })
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
        <template #categoryID="{ item }">
          <td>
            {{ categoriesObjectMappedById[item.categoryID] }}
          </td>
        </template>
        <template #categoryID-filter>
          <CSelect
            placeholder=""
            style="height: 32px; width: 100%; margin: auto"
            :value="categoryID"
            :options="[{ value: '', label: '...' }, ...categoriesArr]"
            @update:value="(id) => (categoryID = id)"
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
    <CModal
      color="info"
      @update:show="
        (val) => {
          if (!val) priceLinks = [];
        }
      "
      :closeOnBackdrop="true"
      :backdrop="true"
      title="قیمت‌های محصول"
      :show.sync="showPriceLinksModal"
    >
      <CRow>
        <template v-if="priceLinks && priceLinks.length > 0">
          <CCol sm="12">
            <CDataTable
              :hover="hover"
              :striped="striped"
              :border="border"
              :small="small"
              :fixed="fixed"
              :items="priceLinks"
              :fields="[
                { key: 'price', label: 'قیمت' },
                { key: 'subscriptionID', label: 'اشتراک' },
                { key: 'actions', label: 'عملیات' },
              ]"
              :dark="dark"
              responsive
              :noItemsView="{
                noResults: 'دیتایی برای نمایش یافت نشد',
                noItems: 'دیتایی برای نمایش وجود ندارد',
              }"
            >
              <template #price="{ item }">
                <td>
                  {{ (+item.price).toLocaleString() }}
                </td>
              </template>

              <template #subscriptionID="{ item }">
                <td>
                  {{ subscriptionsObjectMappedById[item.subscriptionID] }}
                </td>
              </template>

              <template #actions="{ item }">
                <CButton
                  name="cil-pencil"
                  :to="`/admin/productprice/edit/${item.productPriceID}`"
                  size="sm"
                  v-bind="{ variant: 'ghost' }"
                  color="info"
                  class="btn-brand"
                >
                  <CIcon size="sm" name="cil-pencil" />
                </CButton>
              </template>
            </CDataTable>
          </CCol>
        </template>
        <template v-else>
          <CCol sm="12">
            <CListGroupItem
              color="info"
              class="flex-column align-items-start my-2"
            >
              <div class="d-flex w-100 justify-content-center">
                <h5 class="mb-1">برای این محصول قیمتی یاقت نشد</h5>
              </div>
            </CListGroupItem>
          </CCol>
        </template>
      </CRow>
      <template #footer>
        <CButton
          color="success"
          size="sm"
          class="m-2"
          link
          exact
          :to="
            priceLinks && priceLinks[0]
              ? `/admin/productprice/add?prodID=${priceLinks[0].productID}`
              : `/admin/productprice/add`
          "
        >
          <CIcon name="cil-dollar" class="ml-1" />
          اضافه کردن قیمت‌ جدید
        </CButton>
        <CButton
          color="success"
          size="sm"
          class="m-2"
          link
          exact
          to="/admin/productprice/"
        >
          <CIcon name="cil-dollar" class="ml-1" />
          قیمت‌های محصولات
        </CButton>
        <CButton
          color="danger"
          class="m-2"
          @click="showPriceLinksModal = false"
        >
          بستن
        </CButton>
      </template>
    </CModal>
    <CModal
      color="info"
      @update:show="
        (val) => {
          if (!val) optionLinks = [];
        }
      "
      :closeOnBackdrop="true"
      :backdrop="true"
      title="آپشن‌های محصول"
      :show.sync="showOptionLinksModal"
    >
      <CRow>
        <template v-if="optionLinks && optionLinks.length > 0">
          <CCol sm="12">
            <CDataTable
              :hover="hover"
              :striped="striped"
              :border="border"
              :small="small"
              :fixed="fixed"
              :items="optionLinks"
              :fields="[
                { key: 'title', label: 'نام' },
                { key: 'subscriptionID', label: 'اشتراک' },
                { key: 'actions', label: 'عملیات' },
              ]"
              :dark="dark"
              responsive
              :noItemsView="{
                noResults: 'دیتایی برای نمایش یافت نشد',
                noItems: 'دیتایی برای نمایش وجود ندارد',
              }"
            >
              <template #title="{ item }">
                <td>
                  {{ item.option.optionType.title }}
                </td>
              </template>

              <template #subscriptionID="{ item }">
                <td>
                  {{ subscriptionsObjectMappedById[item.subscriptionID] }}
                </td>
              </template>

              <template #actions="{ item }">
                <CButton
                  name="cil-pencil"
                  :to="`/admin/productoption/edit/${item.productOptionID}`"
                  size="sm"
                  v-bind="{ variant: 'ghost' }"
                  color="info"
                  class="btn-brand"
                >
                  <CIcon size="sm" name="cil-pencil" />
                </CButton>
              </template>
            </CDataTable>
          </CCol>
        </template>
        <template v-else>
          <CCol sm="12">
            <CListGroupItem
              color="info"
              class="flex-column align-items-start my-2"
            >
              <div class="d-flex w-100 justify-content-center">
                <h5 class="mb-1">برای این محصول آپشن‌ یاقت نشد</h5>
              </div>
            </CListGroupItem>
          </CCol>
        </template>
      </CRow>
      <template #footer>
        <CButton
          color="success"
          size="sm"
          class="m-2"
          link
          exact
          :to="
            optionLinks && optionLinks[0]
              ? `/admin/productoption/add?prodID=${optionLinks[0].productID}`
              : `/admin/productoption/add`
          "
        >
          <CIcon name="cil-dollar" class="ml-1" />
          اضافه کردن آپشن جدید
        </CButton>
        <CButton
          color="success"
          size="sm"
          class="m-2"
          link
          exact
          to="/admin/productoption/store"
        >
          <CIcon name="cil-cog" class="ml-1" />
          آپشن‌های محصولات
        </CButton>
        <CButton
          color="danger"
          class="m-2"
          @click="showOptionLinksModal = false"
        >
          بستن
        </CButton>
      </template>
    </CModal>
  </CCard>
</template>

<script>
import { getOptions, getPrices } from "../../services/product";
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
      showTable: true,
      range: [],
      columnFilters: null,
      itemsPerPage: 10,
      priceLinks: [],
      categoryID: Number.NaN,
      optionLinks: [],
      isActiveColumnFilter: false,
      showPriceLinksModal: false,
      showOptionLinksModal: false,
    };
  },
  computed: {
    subscriptionsObjectMappedById() {
      const subscriptionsObject = {};
      this.$store.state.subscriptionsArray.map((stateObj) => {
        subscriptionsObject[stateObj.id] = stateObj.title;
      });
      return subscriptionsObject;
    },
    categoriesArr() {
      return this.$store.state.categoriesArray.map((categoryObj) => ({
        label: categoryObj.title,
        value: categoryObj.id,
      }));
    },
    categoriesObjectMappedById() {
      const subscriptionsObject = {};
      this.$store.state.categoriesArray.map((stateObj) => {
        subscriptionsObject[stateObj.id] = stateObj.title;
      });
      return subscriptionsObject;
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
    categoryID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.categoryID = newVal;
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
    async showSettingAction(productId) {
      try {
        const { data } = await getOptions(productId);
        this.optionLinks = data.data;
        this.showOptionLinksModal = true;
      } catch (ex) {
        console.log(ex);
      }
    },
    async showPriceAction(productId) {
      try {
        const { data } = await getPrices(productId);
        this.priceLinks = data.data;
        this.showPriceLinksModal = true;
      } catch (ex) {
        console.log(ex);
      }
    },
    showImageAction(productId) {
      this.$router.push({
        path: `/admin/productimage/show/${productId}`,
      });
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

.add-action-button {
  position: relative;
}

.add-action-button::after {
  content: "+";
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>
