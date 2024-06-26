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
            :to="addNewLink"
            v-if="addNewLink"
          >
            <CIcon name="cil-basket" class="ml-1" />
            اضافه کردن {{ caption }} جدید
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
              v-if="showDelete"
              name="cil-trash"
              size="sm"
              v-bind="{ variant: 'ghost' }"
              @click="$emit('delete-action', item)"
              color="danger"
              class="btn-brand"
            >
              <CIcon size="sm" name="cil-trash" />
            </CButton>
            <!-- <CButton
              name="cil-dollar"
              size="sm"
              v-bind="{ variant: 'ghost' }"
              @click="() => showPriceAction(item.productID)"
              color="info"
              class="btn-brand"
            >
              <CIcon size="sm" name="cil-dollar" />
            </CButton>
            <CButton
              name="cil-settings"
              size="sm"
              v-bind="{ variant: 'ghost' }"
              @click="() => showSettingAction(item.productID)"
              color="info"
              class="btn-brand"
            >
              <CIcon size="sm" name="cil-settings" />
            </CButton>
            <CButton
              name="cil-image"
              size="sm"
              v-bind="{ variant: 'ghost' }"
              @click="() => showImageAction(item.productID)"
              color="info"
              class="btn-brand"
            >
              <CIcon size="sm" name="cil-image" />
            </CButton> -->
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
        <template #isDefault="{ item }">
          <td>
            <CSwitch
              class="mr-2"
              :checked="item.isDefault"
              color="success"
              v-bind="{ variant: '3d' }"
              value="success"
              @update:checked="
                (status) =>
                  $emit('toggle-profile-state', { status, data: item })
              "
            />
          </td>
        </template>
        <template #isDefault-filter>
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
        <template #userID="{ item }">
          <td>
            {{ personsObjectMappedById[item.userID] }}
          </td>
        </template>
        <template #userID-filter>
          <CSelect
            placeholder=""
            style="height: 32px; width: 100%; margin: auto"
            :value="userID"
            :options="[{ value: '', label: '...' }, ...personsArr]"
            @update:value="(id) => (userID = id)"
          />
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
            :options="[{ value: '', label: '...' }, ...personsArr]"
            @update:value="(id) => (personID = id)"
          />
        </template>
        <template #profileID="{ item }">
          <td>
            {{ profilesObjectMappedById[item.profileID] || item.profileID }}
          </td>
        </template>
        <!-- <template #profileID-filter>
          <CSelect
            placeholder=""
            style="height: 32px; width: 100%; margin: auto"
            :value="profileID"
            :options="[{ value: '', label: '...' }, ...profilesArr]"
            @update:value="(id) => (profileID = id)"
          />
        </template> -->
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
        <template v-for="priceObj in priceLinks">
          <CCol col="6" sm="6" :key="priceObj.productPriceID">
            <router-link
              :to="`/admin/productprice/edit/${priceObj.productPriceID}`"
            >
              <CCallout color="info">
                <small class="text-muted">قیمت</small><br />
                <strong>{{ priceObj.price.toLocaleString() }}</strong> <br />
                <small class="text-muted">اشتراک:</small><br />
                <!-- <strong>{{
                  subscriptionsObjectMappedById[priceObj.subscriptionID]
                }}</strong> -->
              </CCallout>
            </router-link>
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
        <template v-for="optionObj in optionLinks">
          <CCol col="12" sm="6" :key="optionObj.productOptionID">
            <router-link :to="`/admin/option/edit/${optionObj.optionID}`">
              <CCallout color="info">
                <small class="text-muted">نام:</small><br />
                <strong>{{ optionObj.option.optionType.title }}</strong>
                <br />
                <small class="text-muted">اشتراک:</small><br />
                <!-- <strong>{{
                  subscriptionsObjectMappedById[optionObj.subscriptionID]
                }}</strong> -->
              </CCallout>
            </router-link>
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
    showDelete: {
      type: Boolean,
      default: true,
    },
    hover: Boolean,
    striped: Boolean,
    border: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean,
    deleteIdField: String,
    addNewLink: String,
  },
  data() {
    return {
      showTable: true,
      range: [],
      columnFilters: null,
      itemsPerPage: 10,
      priceLinks: [],
      userID: Number.NaN,
      personID: Number.NaN,
      profileID: Number.NaN,
      optionLinks: [],
      isActiveColumnFilter: false,
      showPriceLinksModal: false,
      showOptionLinksModal: false,
    };
  },
  computed: {
    personsArr() {
      return this.$store.state.personsArray.map((personObj) => ({
        label: personObj.title,
        value: personObj.id,
      }));
    },
    profilesArr() {
      return this.$store.state.profilesArray.map((profileObj) => ({
        label: profileObj.title,
        value: profileObj.id,
      }));
    },
    personsObjectMappedById() {
      const subscriptionsObject = {};
      this.$store.state.personsArray.map((personObj) => {
        subscriptionsObject[personObj.id] = personObj.title;
      });
      return subscriptionsObject;
    },
    profilesObjectMappedById() {
      const profilesObject = {};
      this.$store.state.profilesArray.map((personObj) => {
        profilesObject[personObj.id] = personObj.title;
      });
      return profilesObject;
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
      this.columnFilters.isDefault = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
    userID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.userID = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
    personID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.personID = newVal;
      this.$emit("column-filter-change", this.columnFilters);
    },
    profileID(newVal) {
      if (!this.columnFilters) this.columnFilters = {};
      this.columnFilters.profileID = newVal;
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
</style>
