<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <CIcon :name="icon" />
            ویرایش {{ data[title] }}
          </div>
          <CButton
            color="info"
            size="sm"
            class="m-2"
            link
            exact
            :to="storeLink"
          >
            <CIcon :name="storeIcon" class="ml-1" />
            {{ storeName }}
          </CButton>
        </div>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CForm
        @submit.prevent="handleSubmit"
        :wasValidated="true"
        ref="editFormElement"
      >
        <CRow>
          <template v-for="field in fields">
            <CCol :sm="field.col" :key="field.name">
              <!-- text input -->
              <CInput
                v-if="field.type === 'text'"
                :value="data[field.name]"
                @input="(e) => (data[field.name] = e)"
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :required="field.isRequired"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :placeholder="field.persianLabel"
              />

              <!-- password input  -->
              <CInput
                v-if="field.type === 'password'"
                :value="data[field.name]"
                @input="(e) => (data[field.name] = e)"
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :required="field.isRequired"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :placeholder="field.persianLabel"
                @focus="showPass = true"
                @blur="showPass = false"
                :type="showPass ? 'text' : 'password'"
              >
              </CInput>

              <!-- option input  -->
              <CSelect
                v-if="field.type === 'option'"
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :required="field.isRequired"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :placeholder="field.persianLabel"
                :value="data[field.name]"
                :options="field.options"
                @update:value="(id) => (data[field.name] = id)"
              />

              <!-- text area  -->
              <CTextarea
                v-if="field.type === 'textarea'"
                :value="data[field.name]"
                @input="(e) => (data[field.name] = e)"
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :required="field.isRequired"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :placeholder="field.persianLabel"
                rows="4"
              />

              <!-- switch input  -->
              <div
                v-if="field.type === 'switch'"
                class="d-flex justify-center align-items-center my-3"
              >
                {{ field.persianLabel + (field.isRequired ? " *" : "") }}:
                {{ data[field.name] ? "فعال" : "غیر‌فعال" }}
                <CSwitch
                  class="mr-2"
                  :checked="Boolean(data[field.name])"
                  color="success"
                  :required="field.isRequired"
                  :isValid="field.validationFunction"
                  :invalidFeedback="field.invalidFeedback"
                  v-bind="{ variant: '3d' }"
                  value="success"
                  @update:checked="(status) => (data[field.name] = status)"
                />
              </div>
            </CCol>
          </template>
        </CRow>
        <CRow class="mt-3">
          <CCol sm="6">
            <CButton
              :class="{ 'disabled-btn': performingAction }"
              color="success"
              style="width: 100%"
              type="submit"
            >
              <CIcon v-if="!performingAction" size="sm" name="cil-save" />
              <CSpinner v-else size="sm" />
              ذخیره
            </CButton></CCol
          >
          <CCol sm="6">
            <CButton
              :class="{ 'disabled-btn': performingAction }"
              color="danger"
              @click="deleteInfo"
              style="width: 100%"
              v-bind="{ variant: 'outline' }"
              ><CIcon v-if="!performingAction" size="sm" name="cil-trash" />
              <CSpinner v-else size="sm" />
              حذف
            </CButton></CCol
          >
        </CRow>
      </CForm>
    </CCardBody>
  </CCard>
</template>

<script>
import editPageMixin from "../../mixins/editPage";
export default {
  mixins: [editPageMixin],
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    storeIcon: {
      type: String,
      required: true,
    },
    storeLink: {
      type: String,
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    storePageName: {
      type: String,
      required: true,
    },
    fetchInfoMethod: {
      type: Function,
      required: true,
    },
    deleteInfoMethod: {
      type: Function,
      required: true,
    },
    updateInfoMethod: {
      type: Function,
      required: true,
    },
    keysToPost: {
      type: Array,
      required: true,
    },
    deleteIdField: String,
  },
  data() {
    return {
      showPass: false,
    };
  },
  methods: {
    handleSubmit() {
      const invalidInputs =
        this.$refs.editFormElement.querySelectorAll(".is-invalid");
      const invalid = invalidInputs.length > 0;
      if (invalid)
        return this.$store.dispatch(
          "addAlert",
          {
            messageHeader: "خطا",
            type: "danger",
            messageBody: "لطفا مقادیر را کنترل کنید",
            autoHide: true,
            timeout: 3000,
          },
          { root: true }
        );
      this.updateInfo.call(this);
    },
  },
};
</script>
