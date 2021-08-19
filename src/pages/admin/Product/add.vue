<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <CIcon name="cil-basket" />
            ثبت محصول جدید
          </div>
          <CButton
            color="info"
            size="sm"
            class="m-2"
            link
            exact
            to="/admin/product/"
          >
            <CIcon name="cil-basket" class="ml-1" />
            همه محصولات
          </CButton>
        </div>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol sm="6">
          <CInput
            :value="data.title"
            @input="(e) => (data.title = e)"
            label="نام"
            placeholder="نام"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.path"
            @input="(e) => (data.path = e)"
            label="مسیر"
            placeholder="مسیر"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.parameter"
            @input="(e) => (data.parameter = e)"
            label="پارامتر"
            placeholder="پارامتر"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.categoryID"
            @input="(e) => (data.categoryID = e)"
            label="کد دسته بندی"
            placeholder="کد دسته بندی"
          />
        </CCol>

        <CCol sm="6">
          <CInput
            :value="data.serverID"
            @input="(e) => (data.serverID = e)"
            label="آیدی سرور"
            placeholder="آیدی سرور"
          />
        </CCol>

        <CCol sm="6">
          <CInput
            :value="data.stock"
            @input="(e) => (data.stock = e)"
            label="موجودی"
            placeholder="موجودی"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.price"
            @input="(e) => (data.price = e)"
            label="قیمت"
            placeholder="قیمت"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.softwareName"
            @input="(e) => (data.softwareName = e)"
            label="نام نرم‌افزار"
            placeholder="نام نرم‌افزار"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.softwareInstalledPath"
            @input="(e) => (data.softwareInstalledPath = e)"
            label="مسیر نصب"
            placeholder="مسیر نصب"
          />
        </CCol>
        <CCol sm="6">
          <CInput
            :value="data.shortDescription"
            @input="(e) => (data.shortDescription = e)"
            label="توضیحات کوتاه"
            placeholder="توضیحات کوتاه"
          />
        </CCol>
        <CCol sm="12">
          <CTextarea
            :value="data.longDescription"
            @input="(e) => (data.longDescription = e)"
            label="توضیحات"
            placeholder="توضیحات..."
            rows="4"
          />
        </CCol>
        <CCol sm="6" class="my-3">
          <div class="d-flex justify-center align-items-center">
            نرم‌افزار کل: {{ data.allSoftware ? "فعال" : "غیر‌فعال" }}
            <CSwitch
              class="mr-2"
              :checked="data.allSoftware"
              color="success"
              v-bind="{ variant: '3d' }"
              value="success"
              @update:checked="(status) => (data.allSoftware = status)"
            />
          </div>
        </CCol>
        <CCol sm="6" class="my-3">
          <div class="d-flex justify-center align-items-center">
            مجوز فراخوانی exe:
            {{ data.allowExecuteExe ? "فعال" : "غیر‌فعال" }}
            <CSwitch
              class="mr-2"
              :checked="data.allowExecuteExe"
              color="success"
              v-bind="{ variant: '3d' }"
              value="success"
              @update:checked="(status) => (data.allowExecuteExe = status)"
            />
          </div>
        </CCol>
        <CCol sm="6" class="my-3">
          <div class="d-flex justify-center align-items-center">
            وضعیت کالا: {{ data.isActive ? "فعال" : "غیر‌فعال" }}
            <CSwitch
              class="mr-2"
              :checked="data.isActive"
              color="success"
              v-bind="{ variant: '3d' }"
              value="success"
              @update:checked="(status) => (data.isActive = status)"
            />
          </div>
        </CCol>
        <CCol sm="6" class="my-3">
          <div class="d-flex justify-center align-items-center">
            قابلیت فروش:
            {{ data.hasStock ? "فعال" : "غیر‌فعال" }}
            <CSwitch
              class="mr-2"
              :checked="data.hasStock"
              color="success"
              v-bind="{ variant: '3d' }"
              value="success"
              @update:checked="(status) => (data.hasStock = status)"
            />
          </div>
        </CCol>
      </CRow>
      <CRow class="mt-3">
        <CCol sm="12">
          <CButton
            :class="{ 'disabled-btn': performingAction }"
            color="success"
            style="width: 100%"
            @click="addInfo"
          >
            <CIcon v-if="!performingAction" size="sm" name="cil-basket" />
            <CSpinner v-else size="sm" />
            ثبت
          </CButton></CCol
        >
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
import { addProduct } from "../../../services/product";
import addPageMixin from "../../../mixins/addPage";
export default {
  mixins: [addPageMixin],
  data() {
    return {
      addInfoMethod: addProduct,
      storePageName: "storePersons",
      showPass: false,
      keysToPost: [
        "title",
        "path",
        "parameter",
        "categoryID",
        "isActive",
        "allSoftware",
        "allowExecuteExe",
        "serverID",
        "hasStock",
        "stock",
        "price",
        "shortDescription",
        "longDescription",
        "softwareName",
        "softwareInstalledPath",
      ],
      data: {
        title: "",
        path: "",
        parameter: "",
        categoryID: "",
        isActive: false,
        allSoftware: false,
        allowExecuteExe: false,
        serverID: "",
        hasStock: false,
        stock: "",
        price: "",
        shortDescription: "",
        longDescription: "",
        softwareName: "",
        softwareInstalledPath: "",
      },
    };
  },
};
</script>