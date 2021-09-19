<template>
  <div>
    <CCard>
      <CCardHeader>
        <slot name="header">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <CIcon name="cil-wallet" />
              اضافه کردن سفارش
            </div>
            <CButton
              color="info"
              size="sm"
              class="m-2"
              link
              exact
              to="/admin/order"
            >
              <CIcon name="cil-wallet" class="ml-1" />
              همه سفارشات
            </CButton>
          </div>
        </slot>
      </CCardHeader>
      <CCardBody>
        <CForm @submit.prevent="addProductDetail" ref="addFormElement">
          <CRow>
            <CCol sm="12">
              <div class="section-title">اطلاعات سفارش</div>
            </CCol>
            <CCol sm="6">
              <CSelect
                label="کاربر"
                required
                :isValid="(val) => val"
                invalidFeedback="لطفا کاربر را انتخاب کنید"
                oninvalid="`this.setCustomValidity('لطفا کاربر را انتخاب کنید')`"
                validationMessage="لطفا کاربر را انتخاب کنید"
                @blur="checkValidity"
                placeholder="کاربر"
                :value="userID"
                :options="personsArray"
                @update:value="
                  (id, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    userID = id;
                  }
                "
              />
            </CCol>
            <CCol sm="6">
              <CInput
                :value="price"
                type="number"
                @input="
                  (e, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    price = e;
                  }
                "
                label="مبلغ پرداختی"
                :isValid="(val) => !val || (val && !Number.isNaN(val))"
                invalidFeedback="قیمت را وارد کنید"
                oninvalid="`this.setCustomValidity('قیمت را وارد کنید')`"
                validationMessage="قیمت را وارد کنید"
                @blur="checkValidity"
                placeholder="مبلغ پرداختی"
              />
            </CCol>
            <CCol sm="6">
              <CSelect
                label="نوع پرداخت"
                :isValid="(val) => val"
                invalidFeedback="لطفا نوع پرداخت را انتخاب کنید"
                oninvalid="`this.setCustomValidity('لطفا نوع پرداخت را انتخاب کنید')`"
                validationMessage="لطفا نوع پرداخت را انتخاب کنید"
                placeholder="نوع پرداخت"
                :value="orderPayTypeID"
                :options="orderPayTypesArray"
                @update:value="
                  (id, ev) => {
                    orderPayTypeID = id;
                  }
                "
            /></CCol>
            <CCol sm="6">
              <CInput
                :value="code"
                required
                type="text"
                @input="
                  (e, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    code = e;
                  }
                "
                label="کد"
                :isValid="(val) => !val || (val && !Number.isNaN(val))"
                invalidFeedback="کد را وارد کنید"
                oninvalid="`this.setCustomValidity('کد را وارد کنید')`"
                validationMessage="کد را وارد کنید"
                @blur="checkValidity"
                placeholder="کد"
              />
            </CCol>
            <CCol sm="6">
              <CInput
                :value="transactionCode"
                type="text"
                @input="
                  (e, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    transactionCode = e;
                  }
                "
                label="کد تراکنش"
                :isValid="(val) => !val || (val && !Number.isNaN(val))"
                invalidFeedback="کد تراکنش را وارد کنید"
                oninvalid="`this.setCustomValidity('کد تراکنش را وارد کنید')`"
                validationMessage="کد تراکنش را وارد کنید"
                @blur="checkValidity"
                placeholder="کد تراکنش"
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol sm="12">
              <div class="section-title">محصول</div>
            </CCol>
            <CCol sm="6">
              <CSelect
                label="محصول"
                required
                :isValid="(val) => val"
                invalidFeedback="لطفا محصول را انتخاب کنید"
                oninvalid="`this.setCustomValidity('لطفا محصول را انتخاب کنید')`"
                validationMessage="لطفا محصول را انتخاب کنید"
                @blur="checkValidity"
                placeholder="محصول"
                :value="productID"
                :options="productsArray"
                @update:value="
                  (id, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    loadProductPriceAndOptions(id);
                    productID = id;
                  }
                "
              />
            </CCol>
            <CCol sm="6">
              <CInput
                :value="quantity"
                type="number"
                @input="
                  (e, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    quantity = e;
                  }
                "
                label="تعداد"
                disabled
                required
                :isValid="(val) => val && !Number.isNaN(val)"
                invalidFeedback="تعداد را وارد کنید"
                oninvalid="`this.setCustomValidity('تعداد را وارد کنید')`"
                validationMessage="تعداد را وارد کنید"
                @blur="checkValidity"
                placeholder="تعداد"
            /></CCol>
            <CCol sm="6">
              <CSelect
                label="قیمت"
                :isValid="(val) => val"
                invalidFeedback="لطفا قیمت را انتخاب کنید"
                oninvalid="`this.setCustomValidity('لطفا قیمت را انتخاب کنید')`"
                validationMessage="لطفا قیمت را انتخاب کنید"
                @blur="checkValidity"
                placeholder="قیمت"
                :value="productPriceID"
                :options="productPriceOptions"
                @update:value="
                  (id, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    productPriceID = id;
                  }
                "
            /></CCol>
            <CCol sm="6">
              <CSelect
                label="آپشن محصول"
                :isValid="(val) => productOptionIDs.length > 0"
                :class="{ 'is-invalid': productOptionSelected }"
                invalidFeedback="لطفا آپشن محصول را انتخاب کنید"
                oninvalid="`this.setCustomValidity('لطفا آپشن محصول را انتخاب کنید')`"
                validationMessage="لطفا آپشن محصول را انتخاب کنید"
                placeholder="آپشن محصول"
                :value="productOptionID"
                :options="productOptionsChoices"
                @update:value="
                  (id, ev) => {
                    productOptionID = id;
                  }
                "
            /></CCol>
            <CCol
              sm="2"
              class="d-flex justify-content-center align-items-center my-2"
              v-for="(productOptionID, index) in productOptionIDs"
              :key="'optiontype' + productOptionID"
            >
              <CListGroupItem
                @click="() => removeSelectedOption(index)"
                href="#"
                active
                color="info"
                class="flex-column align-items-start my-2"
              >
                <div class="d-flex w-100 justify-content-center">
                  <h6 class="mb-1 text-center">
                    {{ getOptionTitle(productOptionID).label }}
                    <CIcon class="text-white" name="cil-x" />
                  </h6>
                </div>
              </CListGroupItem>
            </CCol>
          </CRow>
          <CRow>
            <CCol
              sm="6"
              class="d-flex justify-content-center align-items-center my-2"
            >
              <CButton
                color="info"
                style="width: 100%"
                @click="
                  () => {
                    selectedProductOptionIDs.push(productOptionID);
                    productOptionIDs.push(productOptionID);
                    productOptionID = null;
                  }
                "
              >
                + اضافه کردن آپشن
              </CButton>
            </CCol>
          </CRow>
          <CRow class="mt-3">
            <CCol sm="12">
              <CButton color="info" style="width: 100%" type="submit">
                + اضافه کردن محصول
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
    <CRow
      ><CCol
        sm="12"
        lg="4"
        v-for="(prodDetail, index) in productDetails"
        :key="prodDetail.productID"
      >
        <CCard color="primary">
          <CCardHeader class="text-white d-flex justify-content-between"
            ><div>{{ productsObjectMappedById[prodDetail.productID] }}</div>
            <CButton
              v-bind="{ variant: 'ghost' }"
              size="sm"
              @click="() => delteConfirmedOrder(index)"
            >
              <CIcon class="text-white" name="cil-x" color="white" /> </CButton
          ></CCardHeader>
          <CCardBody>
            <CRow
              ><CCol sm="6">
                <div class="text-white">
                  <div class="d-flex">
                    <CIcon name="cil-user" />
                    <p class="mr-2">
                      {{ personsObjectMappedById[userID] }}
                    </p>
                  </div>
                  <div class="d-flex">
                    <CIcon name="cil-dollar" />
                    <p class="mr-2">
                      {{ prodDetail.productPriceID }}
                    </p>
                  </div>
                  <div class="d-flex">
                    <CIcon name="cil-basket" />
                    <p class="mr-2">
                      {{ productsObjectMappedById[prodDetail.productID] }}
                    </p>
                  </div>
                </div>
              </CCol></CRow
            >
          </CCardBody>
        </CCard></CCol
      >
      <CCol sm="12">
        <CButton
          v-if="productDetails.length > 0"
          @click="handleSubmit"
          :class="{ 'disabled-btn': performingAction }"
          color="success"
          style="width: 100%"
          type="submit"
        >
          <CSpinner v-if="performingAction" size="sm" />
          ثبت
        </CButton>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import * as optionsApi from "../../../services/product/options";
import * as pricesApi from "../../../services/product/prices";
import { add } from "../../../services/order";
export default {
  data() {
    return {
      fields: [],
      performingAction: false,
      userID: 0,
      price: 0,
      payTypeID: 0,
      code: "",
      productID: 0,
      productPriceID: 0,
      productOptionID: 0,
      orderPayTypeID: 0,
      transactionCode: "",
      quantity: 1,
      prodDetailId: 0,
      productOptionIDs: [],
      productPriceOptions: [],
      productOptions: [],
      orderProducts: [],
      productDetails: [],
      selectedProductOptionIDs: [],
      selectedProducts: [],
    };
  },
  computed: {
    personsArray() {
      return this.$store.state.personsArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    orderPayTypesArray() {
      return this.$store.state.orderPayTypesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    productsArray() {
      return this.$store.state.productsArray
        .map((stateObj) => ({
          label: stateObj.title,
          value: stateObj.id,
        }))
        .filter((product) => !this.selectedProducts.includes(product.value));
    },
    productOptionSelected() {
      return this.productOptionIDs.length > 0;
    },
    personsObjectMappedById() {
      const subscriptionsObject = {};
      this.$store.state.personsArray.map((personObj) => {
        subscriptionsObject[personObj.id] = personObj.title;
      });
      return subscriptionsObject;
    },
    productsObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.productsArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      return optionTypesObject;
    },
    productOptionsChoices() {
      const idsMappedByTypes = {};
      this.productOptions.map((obj) => {
        idsMappedByTypes[obj.value] = obj.type;
      });
      const self = this;
      const selectedOptionTypeIds = self.selectedProductOptionIDs.map(
        (id) => idsMappedByTypes[id]
      );
      return this.productOptions.filter(
        (obj) => !selectedOptionTypeIds.includes(obj.type)
      );
    },
  },
  methods: {
    removeSelectedOption(index) {
      this.productOptionIDs.splice(index, 1);
      this.selectedProductOptionIDs.splice(index, 1);
    },
    getOptionTitle(productOptionID) {
      const matchingOptions = this.productOptions.filter(
        (obj) => obj.value === productOptionID
      );
      return matchingOptions[0];
    },
    addProductDetail() {
      const self = this;
      this.selectedProducts.push(self.productID);
      this.productDetails.push({
        productID: self.productID,
        quantity: self.quantity,
        productPriceID: self.productPriceID,
        productOptionIDs: self.productOptionIDs,
      });
      self.productID = null;
      self.productPriceID = null;
      self.productOptionIDs = [];
    },
    delteConfirmedOrder(index) {
      this.productDetails.splice(index, 1);
      this.selectedProducts.splice(index, 1);
    },
    async loadProductPriceAndOptions(id) {
      const self = this;
      try {
        const prices = await optionsApi.catalog(id);
        let temp = prices.data.data.map((option) => {
          debugger;
          return {
            label: option.option.title,
            value: option.productOptionID,
            type: option.option.optionTypeID,
          };
        });
        self.productOptions = temp;

        const options = await pricesApi.catalog(id);
        let temp2 = options.data.data.map((priceObj) => {
          return {
            label:
              priceObj.subscription.title +
              " - " +
              priceObj.price.toLocaleString(),
            value: priceObj.productPriceID,
          };
        });
        self.productPriceOptions = temp2;
      } catch (ex) {
        console.log(ex);
      }
    },
    async handleSubmit() {
      this.performingAction = true;
      const self = this;
      const formData = this.cloneData();
      try {
        await add(formData);
        setTimeout(() => this.$router.push({ name: "order" }), 2000);
      } catch (ex) {
        console.log(ex);
      }
      self.performingAction = false;
    },
    cloneData() {
      const self = this;
      return {
        personID: self.userID,
        price: self.price,
        code: self.code,
        orderPayTypeID: self.orderPayTypeID,
        transactionCode: self.transactionCode,
        details: self.productDetails,
      };
    },
    checkValidity(ev) {
      ev.currentTarget.setCustomValidity(ev.currentTarget.validationMessage);
      ev.currentTarget.checkValidity();
      ev.currentTarget.reportValidity();
    },
  },
};
</script>

<style lang="scss">
.was-validated .form-check-input:valid ~ .form-check-label,
.form-check-input.is-valid ~ .form-check-label {
  color: rgba(0, 0, 0, 0.8);
}

.section-title {
  width: 100%;
  height: 50px;
  padding: 10px 0;
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: bold;
  position: relative;
}

.section-title::after {
  content: "";
  width: 150px;
  height: 3px;
  background-color: #3399ff;
  position: absolute;
  bottom: 7px;
  right: 0px;
  border-radius: 12px;
}
</style>