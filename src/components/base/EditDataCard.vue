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
        v-if="infoFetched"
        @submit.prevent="handleSubmit"
        ref="editFormElement"
      >
        <CRow>
          <template v-for="field in fields">
            <CCol :sm="field.col" :key="field.name">
              <!-- text input -->
              <CInput
                v-if="field.type === 'text'"
                :value="getProp(data, field.name)"
                @input="(e) => setProp(data, field.name, e)"
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :required="field.isRequired"
                :autocomplete="field.autocomplete"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :placeholder="field.persianLabel"
              />

              <!-- number input -->
              <CInput
                v-if="field.type === 'number'"
                :value="getProp(data, field.name)"
                @input="(e) => setProp(data, field.name, e)"
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :required="field.isRequired"
                :autocomplete="field.autocomplete"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :placeholder="field.persianLabel"
                type="number"
              />

              <!-- password input  -->
              <CInput
                v-if="field.type === 'password'"
                :value="getProp(data, field.name)"
                :autocomplete="field.autocomplete"
                @input="(e) => setProp(data, field.name, e)"
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
                :value="getProp(data, field.name)"
                :options="field.options"
                @update:value="(id) => setProp(data, field.name, id)"
              />

              <!-- text area  -->
              <CTextarea
                v-if="field.type === 'textarea'"
                :value="getProp(data, field.name)"
                @input="(e) => setProp(data, field.name, e)"
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :required="field.isRequired"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :placeholder="field.persianLabel"
                rows="4"
              />

              <!-- checkbox input  -->
              <CInputCheckbox
                v-if="field.type === 'checkbox'"
                class="my-2 w-100"
                :checked="Boolean(getProp(data, field.name))"
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :required="field.isRequired"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${field.invalidFeedback}')`"
                :validationMessage="field.invalidFeedback"
                :name="field.name"
                @update:checked="
                  (status) => setProp(data, field.name, Number(status))
                "
              />

              <!-- switch input  -->
              <div
                v-if="field.type === 'switch'"
                class="d-flex justify-center align-items-center my-3"
              >
                {{ field.persianLabel + (field.isRequired ? " *" : "") }}:
                {{ getProp(data, field.name) ? "فعال" : "غیر‌فعال" }}
                <CSwitch
                  class="mr-2"
                  :checked="Boolean(getProp(data, field.name))"
                  color="success"
                  :required="field.isRequired"
                  :isValid="field.validationFunction"
                  :invalidFeedback="field.invalidFeedback"
                  v-bind="{ variant: '3d' }"
                  value="success"
                  @update:checked="
                    (status) => setProp(data, field.name, status)
                  "
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
              v-if="deleteInfoMethod"
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
      required: false,
      default: null,
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
    getProp(obj, prop) {
      return prop.split(".").reduce((r, e) => {
        return r[e];
      }, obj);
    },
    setProp(data, path, value) {
      let schema = data;
      let pList = path.split(".");
      let len = pList.length;
      for (let i = 0; i < len - 1; i++) {
        let elem = pList[i];
        if (!schema[elem]) schema[elem] = {};
        schema = schema[elem];
      }

      schema[pList[len - 1]] = value;
    },
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
