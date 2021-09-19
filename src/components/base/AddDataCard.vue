<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <CIcon :name="icon" />
            {{ title }}
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
      <CForm @submit.prevent="handleSubmit" ref="addFormElement">
        <CRow>
          <template v-for="field in fields">
            <CCol
              :sm="field.col"
              :key="field.name"
              class="d-flex justify-content-start align-items-center"
            >
              <!-- text input -->
              <CInput
                v-if="field.type === 'text'"
                :value="
                  data[field.name] ||
                  (field.defaultVal &&
                    (() => {
                      data[field.name] = field.defaultVal;
                      return true;
                    })())
                    ? field.defaultVal
                    : null
                "
                class="w-100"
                @input="
                  (e, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    data[field.name] = e;
                  }
                "
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :required="field.isRequired"
                :isValid="field.validationFunction"
                :autocomplete="field.autocomplete"
                :invalidFeedback="field.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${field.invalidFeedback}')`"
                :validationMessage="field.invalidFeedback"
                @blur="checkValidity"
                :placeholder="field.placeholder || field.persianLabel"
              />

              <!-- number input -->
              <CInput
                v-if="field.type === 'number'"
                :value="
                  data[field.name] ||
                  (field.defaultVal &&
                    (() => {
                      data[field.name] = field.defaultVal;
                      return true;
                    })())
                    ? field.defaultVal
                    : null
                "
                class="w-100"
                type="number"
                @input="
                  (e, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    data[field.name] = e;
                  }
                "
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :required="field.isRequired"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${field.invalidFeedback}')`"
                :validationMessage="field.invalidFeedback"
                @blur="checkValidity"
                :placeholder="field.placeholder || field.persianLabel"
              />

              <!-- password input  -->
              <CInput
                v-if="field.type === 'password'"
                :value="
                  data[field.name] ||
                  (field.defaultVal &&
                    (() => {
                      data[field.name] = field.defaultVal;
                      return true;
                    })())
                    ? field.defaultVal
                    : null
                "
                class="w-100"
                @input="
                  (e, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    data[field.name] = e;
                  }
                "
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :autocomplete="field.autocomplete"
                :required="field.isRequired"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${field.invalidFeedback}')`"
                :validationMessage="field.invalidFeedback"
                :placeholder="field.placeholder || field.persianLabel"
                @focus="showPass = true"
                @blur="showPass = false && checkValidity()"
                :type="showPass ? 'text' : 'password'"
              >
              </CInput>

              <!-- option input  -->
              <CSelect
                v-if="field.type === 'option'"
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :required="field.isRequired"
                class="w-100"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${field.invalidFeedback}')`"
                :validationMessage="field.invalidFeedback"
                @blur="checkValidity"
                :placeholder="field.placeholder || field.persianLabel"
                :value="
                  data[field.name] ||
                  (field.defaultVal &&
                    (() => {
                      data[field.name] = field.defaultVal;
                      return true;
                    })())
                    ? field.defaultVal
                    : null
                "
                :disabled="field.defaultVal ? true : false"
                :options="field.options"
                @update:value="
                  (id, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    data[field.name] = id;
                  }
                "
              />

              <!-- text area  -->
              <CTextarea
                v-if="field.type === 'textarea'"
                :value="
                  data[field.name] ||
                  (field.defaultVal &&
                    (() => {
                      data[field.name] = field.defaultVal;
                      return true;
                    })())
                    ? field.defaultVal
                    : null
                "
                class="w-100"
                :required="field.isRequired"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${field.invalidFeedback}')`"
                :validationMessage="field.invalidFeedback"
                @blur="checkValidity"
                @input="
                  (e, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    data[field.name] = e;
                  }
                "
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :placeholder="field.placeholder || field.persianLabel"
                rows="4"
              />

              <!-- checkbox input  -->
              <CInputCheckbox
                v-if="field.type === 'checkbox'"
                class="my-2 w-100"
                :checked="Boolean(data[field.name])"
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :required="field.isRequired"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${field.invalidFeedback}')`"
                :validationMessage="field.invalidFeedback"
                @blur="checkValidity"
                :name="field.name"
                @update:checked="
                  (status, ev) => {
                    data[field.name] = Number(status);
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                  }
                "
              />

              <!-- switch input  -->
              <div
                v-if="field.type === 'switch'"
                class="d-flex justify-center align-items-center my-3 w-100"
              >
                {{ field.persianLabel + (field.isRequired ? " *" : "") }}:
                {{ Boolean(data[field.name]) ? "فعال" : "غیر‌فعال" }}
                <CSwitch
                  class="mr-2"
                  :checked="Boolean(data[field.name])"
                  color="success"
                  :required="field.isRequired"
                  :isValid="field.validationFunction"
                  :invalidFeedback="field.invalidFeedback"
                  :oninvalid="`this.setCustomValidity('${field.invalidFeedback}')`"
                  :validationMessage="field.invalidFeedback"
                  @blur="checkValidity"
                  v-bind="{ variant: '3d' }"
                  value="success"
                  @update:checked="
                    (status, ev) => {
                      data[field.name] = status;
                      ev.currentTarget.setCustomValidity('');
                      ev.currentTarget.checkValidity();
                    }
                  "
                />
              </div>

              <!-- file input  -->
              <input
                v-if="field.type === 'file' || field.type === 'file'"
                class="w-100"
                :label="field.persianLabel + (field.isRequired ? ' *' : '')"
                :required="field.isRequired"
                :placeholder="field.placeholder || 'فایل را انتخاب'"
                type="file"
                accept="image/png, image/jpeg"
                :name="field.refName"
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${field.invalidFeedback}')`"
                :validationMessage="field.invalidFeedback"
                @blur="checkValidity"
                @update:checked="
                  (status, ev) => {
                    debugger;
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                  }
                "
                :ref="field.refName"
                horizontal
                custom
              />
            </CCol>
          </template>
        </CRow>
        <CRow class="mt-3">
          <CCol sm="12">
            <CButton
              :class="{ 'disabled-btn': performingAction }"
              color="success"
              style="width: 100%"
              type="submit"
            >
              <CSpinner v-if="performingAction" size="sm" />
              ثبت
            </CButton></CCol
          >
        </CRow>
      </CForm>
    </CCardBody>
    <CCardHeader v-if="hasSubFrom && subformTitle">
      <slot name="header">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <CIcon :name="icon" />
            {{ subformTitle }}
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
    <CCardBody v-if="hasSubFrom">
      <CForm @submit.prevent="handleSubmitSubForm" ref="addSubFormElement">
        <CRow>
          <template v-for="subField in subFields">
            <CCol :sm="subField.col" :key="subField.name">
              <!-- text input -->
              <CInput
                v-if="subField.type === 'text'"
                :value="
                  data[field.name] ||
                  (field.defaultVal &&
                    (() => {
                      data[field.name] = field.defaultVal;
                      return true;
                    })())
                    ? field.defaultVal
                    : null
                "
                @input="
                  (e, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    data[subField.name] = e;
                  }
                "
                :label="
                  subField.persianLabel + (subField.isRequired ? ' *' : '')
                "
                :required="subField.isRequired"
                :isValid="subField.validationFunction"
                :autocomplete="subField.autocomplete"
                :invalidFeedback="subField.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${subField.invalidFeedback}')`"
                :validationMessage="subField.invalidFeedback"
                @blur="checkValidity"
                :placeholder="subField.placeholder || subField.persianLabel"
              />

              <!-- number input -->
              <CInput
                v-if="subField.type === 'number'"
                :value="
                  data[field.name] ||
                  (field.defaultVal &&
                    (() => {
                      data[field.name] = field.defaultVal;
                      return true;
                    })())
                    ? field.defaultVal
                    : null
                "
                type="number"
                @input="
                  (e, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    data[subField.name] = e;
                  }
                "
                :label="
                  subField.persianLabel + (subField.isRequired ? ' *' : '')
                "
                :required="subField.isRequired"
                :isValid="subField.validationFunction"
                :invalidFeedback="subField.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${subField.invalidFeedback}')`"
                :validationMessage="subField.invalidFeedback"
                @blur="checkValidity"
                :placeholder="subField.placeholder || subField.persianLabel"
              />

              <!-- password input  -->
              <CInput
                v-if="subField.type === 'password'"
                :value="
                  data[field.name] ||
                  (field.defaultVal &&
                    (() => {
                      data[field.name] = field.defaultVal;
                      return true;
                    })())
                    ? field.defaultVal
                    : null
                "
                @input="
                  (e, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    data[subField.name] = e;
                  }
                "
                :label="
                  subField.persianLabel + (subField.isRequired ? ' *' : '')
                "
                :autocomplete="subField.autocomplete"
                :required="subField.isRequired"
                :isValid="subField.validationFunction"
                :invalidFeedback="subField.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${subField.invalidFeedback}')`"
                :validationMessage="subField.invalidFeedback"
                :placeholder="subField.placeholder || subField.persianLabel"
                @focus="showPass = true"
                @blur="showPass = false && checkValidity()"
                :type="showPass ? 'text' : 'password'"
              >
              </CInput>

              <!-- option input  -->
              <CSelect
                v-if="subField.type === 'option'"
                :label="
                  subField.persianLabel + (subField.isRequired ? ' *' : '')
                "
                :required="subField.isRequired"
                :isValid="subField.validationFunction"
                :invalidFeedback="subField.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${subField.invalidFeedback}')`"
                :validationMessage="subField.invalidFeedback"
                @blur="checkValidity"
                :placeholder="subField.placeholder || subField.persianLabel"
                :value="
                  data[field.name] ||
                  (field.defaultVal &&
                    (() => {
                      data[field.name] = field.defaultVal;
                      return true;
                    })())
                    ? field.defaultVal
                    : null
                "
                :options="subField.options"
                @update:value="
                  (id, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    data[subField.name] = id;
                  }
                "
              />

              <!-- text area  -->
              <CTextarea
                v-if="subField.type === 'textarea'"
                :value="
                  data[field.name] ||
                  (field.defaultVal &&
                    (() => {
                      data[field.name] = field.defaultVal;
                      return true;
                    })())
                    ? field.defaultVal
                    : null
                "
                :required="subField.isRequired"
                :isValid="subField.validationFunction"
                :invalidFeedback="subField.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${subField.invalidFeedback}')`"
                :validationMessage="subField.invalidFeedback"
                @blur="checkValidity"
                @input="
                  (e, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                    data[subField.name] = e;
                  }
                "
                :label="
                  subField.persianLabel + (subField.isRequired ? ' *' : '')
                "
                :placeholder="subField.placeholder || subField.persianLabel"
                rows="4"
              />

              <!-- switch input  -->
              <div
                v-if="subField.type === 'switch'"
                class="d-flex justify-center align-items-center my-3"
              >
                {{ subField.persianLabel + (subField.isRequired ? " *" : "") }}:
                {{ Boolean(data[subField.name]) ? "فعال" : "غیر‌فعال" }}
                <CSwitch
                  class="mr-2"
                  :checked="Boolean(data[subField.name])"
                  color="success"
                  :required="subField.isRequired"
                  :isValid="subField.validationFunction"
                  :invalidFeedback="subField.invalidFeedback"
                  :oninvalid="`this.setCustomValidity('${subField.invalidFeedback}')`"
                  :validationMessage="subField.invalidFeedback"
                  @blur="checkValidity"
                  v-bind="{ variant: '3d' }"
                  value="success"
                  @update:checked="
                    (status, ev) => {
                      data[subField.name] = status;
                      ev.currentTarget.setCustomValidity('');
                      ev.currentTarget.checkValidity();
                    }
                  "
                />
              </div>

              <!-- file input  -->
              <CInputFile
                v-if="subField.type === 'file' || subField.type === 'file'"
                :label="
                  subField.persianLabel + (subField.isRequired ? ' *' : '')
                "
                :required="subField.isRequired"
                :placeholder="subField.placeholder || 'فایل را انتخاب'"
                type="file"
                accept="image/png, image/jpeg"
                :name="subField.refName"
                :isValid="subField.validationFunction"
                :invalidFeedback="subField.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${subField.invalidFeedback}')`"
                :validationMessage="subField.invalidFeedback"
                @blur="checkValidity"
                @update:checked="
                  (status, ev) => {
                    ev.currentTarget.setCustomValidity('');
                    ev.currentTarget.checkValidity();
                  }
                "
                :ref="subField.refName"
                horizontal
                custom
              />
            </CCol>
          </template>
        </CRow>
        <CRow class="mt-3">
          <CCol sm="12">
            <CButton
              :class="{ 'disabled-btn': performingAction }"
              color="success"
              style="width: 100%"
              type="submit"
            >
              <CSpinner v-if="performingAction" size="sm" />
              ثبت
            </CButton></CCol
          >
        </CRow>
      </CForm>
    </CCardBody>
  </CCard>
</template>

<script>
import addPageMixin from "../../mixins/addPage";
export default {
  mixins: [addPageMixin],
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
    addInfoMethod: {
      type: Function,
      required: true,
    },
    keysToPost: {
      type: Array,
      required: true,
    },
    addSubInfoMethod: {
      type: Function,
      required: false,
    },
    subFields: {
      type: Array,
      required: false,
    },
    subKeysToPost: {
      type: Array,
      required: false,
    },
    hasSubFrom: {
      required: false,
      default: () => false,
    },
    subformTitle: {
      required: false,
      default: null,
    },
  },
  data() {
    return {
      showPass: false,
    };
  },
  methods: {
    handleSubmit() {
      const invalidInputs =
        this.$refs.addFormElement.querySelectorAll(".is-invalid");
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
      this.addInfo.call(this);
    },
    handleSubmitSubForm() {
      const invalidInputs =
        this.$refs.addSubFormElement.querySelectorAll(".is-invalid");
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
      this.addSubInfo.call(this);
    },
    checkValidity(ev) {
      ev.currentTarget.setCustomValidity(ev.currentTarget.validationMessage);
      ev.currentTarget.checkValidity();
      ev.currentTarget.reportValidity();
    },
  },
};
</script>
