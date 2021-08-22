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
      <form @submit.prevent="handleSubmit">
        <CRow>
          <template v-for="field in fields">
            <CCol :sm="field.col" :key="field.name">
              <!-- text input -->
              <CInput
                v-if="field.type === 'text'"
                :value="data[field.name]"
                @input="(e) => (data[field.name] = e)"
                :label="field.persianLabel"
                :placeholder="field.persianLabel"
              />

              <!-- password input  -->
              <CInput
                v-if="field.type === 'password'"
                :value="data[field.name]"
                @input="(e) => (data[field.name] = e)"
                :label="field.persianLabel"
                :placeholder="field.persianLabel"
                @focus="showPass = true"
                @blur="showPass = false"
                :type="showPass ? 'text' : 'password'"
              >
              </CInput>

              <!-- option input  -->
              <CSelect
                v-if="field.type === 'option'"
                :label="field.persianLabel"
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
                :label="field.persianLabel"
                :placeholder="field.persianLabel"
                rows="4"
              />

              <!-- switch input  -->
              <div
                v-if="field.type === 'switch'"
                class="d-flex justify-center align-items-center my-3"
              >
                {{ field.persianLabel }}:
                {{ data[field.name] ? "فعال" : "غیر‌فعال" }}
                <CSwitch
                  class="mr-2"
                  :checked="data[field.name]"
                  color="success"
                  v-bind="{ variant: '3d' }"
                  value="success"
                  @update:checked="(status) => (data[field.name] = status)"
                />
              </div>

              <!-- file input  -->
              <CInputFile
                v-if="field.type === 'file' || field.type === 'file'"
                :label="field.persianLabel"
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
      </form>
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
      this.addInfo.call(this);
    },
  },
};
</script>
