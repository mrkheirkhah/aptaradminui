<template>
  <CRow>
    <CCol sm="3"></CCol>
    <CCol sm="6">
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
                <CIcon :name="icon" class="ml-1" />
                {{ storeName }}
              </CButton>
            </div>
          </slot>
        </CCardHeader>
        <CCardBody style="max-height: calc(100vh - 240px); overflow: auto">
          <CRow>
            <CCol
              v-for="section in fieldsToShow"
              :key="section.headerName"
              :sm="section.col"
            >
              <CRow>
                <CCol sm="12">
                  <div class="section-title">
                    {{ section.headerName }}
                  </div>
                </CCol>
                <template v-for="field in section.children">
                  <CCol
                    :sm="field.col"
                    :key="field.filedName"
                    v-if="field.type === 'switch' || field.type === 'checkbox'"
                  >
                    <p class="text-bold">
                      <strong>{{ field.persianName }} :</strong>
                    </p>
                    <CIcon
                      :name="field.data ? 'cil-check' : 'cil-x'"
                      class="ml-1"
                    />
                    <hr />
                  </CCol>
                  <CCol
                    :sm="field.col"
                    :key="field.filedName"
                    v-else-if="field.type === 'image'"
                  >
                    <CImg
                      :src="field.data"
                      block
                      :alt="field.persianName"
                      width="100%"
                      height="auto"
                      :fluidGrow="true"
                      align="center"
                      class="mb-2"
                    />
                  </CCol>
                  <CCol :sm="field.col" :key="field.filedName" v-else>
                    <div>
                      <p class="text-bold">
                        <strong>{{ field.persianName }} :</strong>
                      </p>
                      <p class="pr-5">{{ field.data }}</p>
                    </div>
                    <hr />
                  </CCol>
                </template>
              </CRow>
              <CRow v-if="showDelete">
                <CCol col="12">
                  <CButton
                    :class="{ 'disabled-btn': performingAction }"
                    color="danger"
                    @click="deleteInfo"
                    style="width: 100%"
                    v-bind="{ variant: 'outline' }"
                    ><CIcon
                      v-if="!performingAction"
                      size="sm"
                      name="cil-trash"
                    />
                    <CSpinner v-else size="sm" />
                    حذف
                  </CButton>
                </CCol>
              </CRow></CCol
            ></CRow
          >
        </CCardBody>
      </CCard>
    </CCol>
    <CCol sm="3"></CCol>
  </CRow>
</template>

<script>
export default {
  props: {
    title: {
      required: false,
      type: String,
    },
    icon: {
      required: true,
      type: String,
    },
    storeLink: {
      required: true,
      type: String,
    },
    storeName: {
      required: true,
      type: String,
    },
    fieldsToShow: {
      required: true,
      type: Array,
    },
    showDelete: {
      required: false,
      type: Boolean,
      default: () => false,
    },
    deleteField: {
      required: false,
      type: String,
      default: () => "",
    },
    deleteMethod: {
      required: false,
      type: Function,
      default: () => {},
    },
    deleteFieldVal: {
      required: false,
      type: [String, Number],
      default: () => "",
    },
  },
  data() {
    return {
      performingAction: false,
    };
  },
  methods: {
    async deleteInfo() {
      this.performingAction = true;
      const data = {
        data: {
          [this.deleteField]: this.deleteFieldVal,
        },
      };
      try {
        await this.deleteMethod(data);
        this.$router.push({ path: this.storeLink });
      } catch (ex) {
        console.log(ex);
      }
      this.performingAction = false;
    },
  },
};
</script>

<style scoped>
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
