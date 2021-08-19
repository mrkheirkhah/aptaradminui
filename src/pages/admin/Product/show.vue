<template>
  <CRow>
    <CCol sm="3"></CCol>
    <CCol sm="6">
      <CCard>
        <CCardHeader>
          <slot name="header">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <CIcon name="cil-basket" />
                {{ data.title }}
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
              <div>
                <p class="text-bold"><strong>نام:</strong></p>
                <p class="pr-5">{{ data.title }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>مسیر:</strong></p>
                <p class="pr-5">{{ data.path }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>پارامتر:</strong></p>
                <p class="pr-5">{{ data.parameter }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>دسته بندی:</strong></p>
                <p class="pr-5">{{ data.categoryID }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>همه‌ نرم‌افزار:</strong></p>
                <p class="pr-5">{{ data.allSoftware }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>مجوز فراخوانی exe:</strong></p>
                <p class="pr-5">{{ data.allowExecuteExe }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>آیدی سرور:</strong></p>
                <p class="pr-5">{{ data.serverID }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>قابل فروش:</strong></p>
                <p class="pr-5">{{ data.hasStock }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>موجودی:</strong></p>
                <p class="pr-5">{{ data.stock }}</p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>قیمت:</strong></p>
                <p class="pr-5">
                  {{ data.price }}
                </p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>نام نرم‌افزار:</strong></p>
                <p class="pr-5">
                  {{ data.softwareName }}
                </p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>مسیر نصب نرم‌افزار:</strong></p>
                <p class="pr-5">
                  {{ data.softwareInstalledPath }}
                </p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>توضیحات کوتاه:</strong></p>
                <p class="pr-5">
                  {{ data.shortDescription }}
                </p>
              </div>
              <hr />
            </CCol>
            <CCol sm="6">
              <div>
                <p class="text-bold"><strong>توضیحات:</strong></p>
                <p class="pr-5">
                  {{ data.longDescription }}
                </p>
              </div>
              <hr />
            </CCol>

            <CCol sm="12">
              <div class="d-flex justify-center align-items-center">
                <div>
                  <p class="text-bold"><strong>وضعیت:</strong></p>
                  <p class="pr-5">
                    {{ data.isActive ? "فعال" : "غیر‌فعال" }}
                  </p>
                </div>
                <hr />
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol sm="3"></CCol>
  </CRow>
</template>

<script>
import showPageMixin from "../../../mixins/showPage";
import { getProduct } from "@/services/product";
export default {
  mixins: [showPageMixin],
  data() {
    return {
      fetchInfoMethod: getProduct,
      data: {
        title: "",
        path: "",
        parameter: "",
        categoryID: "",
        isActive: "",
        allSoftware: "",
        allowExecuteExe: "",
        serverID: "",
        hasStock: "",
        stock: "",
        price: "",
        shortDescription: "",
        longDescription: "",
        softwareName: "",
        softwareInstalledPath: "",
        productID: "",
      },
    };
  },
};
</script>