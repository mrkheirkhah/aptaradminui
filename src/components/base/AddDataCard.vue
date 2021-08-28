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
      <CForm
        @submit.prevent="handleSubmit"
        :wasValidated="true"
        ref="addFormElement"
      >
        <CRow>
          <template v-for="field in fields">
            <CCol :sm="field.col" :key="field.name">
              <!-- text input -->
              <CInput
                v-if="field.type === 'text'"
                :value="data[field.name]"
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
                :value="data[field.name]"
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
                :value="data[field.name]"
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
                :isValid="field.validationFunction"
                :invalidFeedback="field.invalidFeedback"
                :oninvalid="`this.setCustomValidity('${field.invalidFeedback}')`"
                :validationMessage="field.invalidFeedback"
                @blur="checkValidity"
                :placeholder="field.placeholder || field.persianLabel"
                :value="data[field.name]"
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
                :value="data[field.name]"
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

              <!-- switch input  -->
              <div
                v-if="field.type === 'switch'"
                class="d-flex justify-center align-items-center my-3"
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
                      debugger;
                      data[field.name] = status;
                      ev.currentTarget.setCustomValidity('');
                      ev.currentTarget.checkValidity();
                    }
                  "
                />
              </div>

              <!-- file input  -->
              <CInputFile
                v-if="field.type === 'file' || field.type === 'file'"
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
    checkValidity(ev) {
      ev.currentTarget.setCustomValidity(ev.currentTarget.validationMessage);
      ev.currentTarget.checkValidity();
      ev.currentTarget.reportValidity();
    },
  },
};
</script>
