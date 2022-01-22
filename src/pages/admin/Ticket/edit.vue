<template>
  <CCard style="min-height: calc(100vh - 150px); overflow: auto">
    <CCardHeader>
      <slot name="header">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <CIcon name="cil-tag" class="mx-2" />
            ویرایش {{ data.title }}
          </div>
          <CButton
            color="info"
            size="sm"
            class="m-2"
            link
            exact
            to="/admin/ticket"
          >
            <CIcon name="cil-tags" size="sm" />
            همه تیکت‌ها
          </CButton>
        </div>
      </slot>
    </CCardHeader>
    <div class="py-4 px-4">
      <CTabs variant="pills" :active-tab="0">
        <CTab title="ویرایش">
          <CCardBody style="max-height: calc(100vh - 240px); overflow: auto">
            <CForm
              v-if="infoFetched"
              @submit.prevent="handleSubmit"
              ref="editFormElement"
            >
              <CRow>
                <CCol sm="6">
                  <CInput
                    :value="data.title"
                    @input="(e) => (data.title = e)"
                    label="عنوان"
                    disabled
                    :isValid="(val) => !val || (val && val !== '')"
                    invalidFeedback="عنوان نمیتواند خالی باشد"
                    placeholder="عنوان"
                  />
                </CCol>
                <CCol sm="6">
                  <CSelect
                    label="کاربر"
                    disabled
                    placeholder="کاربر"
                    :value="data.personID"
                    :options="personsArr"
                  />
                </CCol>
                <CCol sm="6">
                  <CSelect
                    label="وضعیت"
                    required
                    :isValid="(val) => val"
                    invalidFeedback="لطفا وضعیت تیکت را مشخص کنید"
                    placeholder="وضعیت تیکت"
                    :value="data.ticketStatusID"
                    :options="ticketStatusTypesArray"
                    @update:value="
                      (ticketStatusID) => (data.ticketStatusID = ticketStatusID)
                    "
                  />
                </CCol> 
                <CCol sm="6">
                  <CInput
                    :value="new Date(data.date).toLocaleString('fa-IR',{year: 'numeric',month: '2-digit',day: '2-digit'})"
                    label="تاریخ دریافت"
                    disabled
                    placeholder="تاریخ دریافت"
                  />
                </CCol>
                <CCol sm="12">
                  <CTextarea
                    :value="data.description"
                    @input="(e) => (data.description = e)"
                    label="توضیحات"
                    disabled
                    :isValid="(val) => !val || (val && val !== '')"
                    invalidFeedback="توضیحات نمیتواند خالی باشد"
                    placeholder="توضیحات"
                    rows="4"
                  />
                </CCol>
              </CRow>

              <CRow class="mt-3">
                <CCol sm="12">
                  <CButton
                    :class="{ 'disabled-btn': performingAction }"
                    color="success"
                    style="width: 100%"
                    type="submit"
                  >
                    <CIcon
                      v-if="!performingAction"
                      size="sm"
                      name="cil-note-add"
                    />
                    <CSpinner v-else size="sm" />
                    ثبت
                  </CButton></CCol
                >
              </CRow>
            </CForm>
          </CCardBody>
        </CTab>
        <CTab title="پاسخ">
          <CCardBody style="max-height: calc(100vh - 240px); overflow: auto">
            <CRow class="px-3">
              <CForm
                v-if="infoFetched"
                @submit.prevent="submitReply"
                ref="replyFormElement"
              >
                <CRow class="pb-2">
                  <CCol sm="12">
                    <div class="pt-2 pb-4">
                      <quill-editor
                        style="height: 400px;direction: rtl"
                        dir="rtl"
                        direction="rtl"
                        :content="replyDescription"
                        :options="editorOption"
                        @change="onEditorChange($event)"
                        @ready="onEditorReady($event)"
                      />
                    </div>
                  </CCol>
                </CRow>
                <CRow class="mt-4">
                  <CCol sm="12">
                    <CButton
                      :class="{ 'disabled-btn': performingAction }"
                      color="success"
                      style="width: 100%"
                      type="submit"
                    >
                      <CIcon
                        v-if="!performingAction"
                        size="sm"
                        name="cil-note-add"
                      />
                      <CSpinner v-else size="sm" />
                      ثبت
                    </CButton></CCol
                  >
                </CRow>
              </CForm>
            </CRow>
          </CCardBody>
        </CTab>
        <CTab title="جواب‌ها">
          <CCardBody style="max-height: calc(100vh - 240px); overflow: auto">
            <CRow>
              <CCol sm="12">
                  <CListGroup>
                        <template v-if="data.replies && data.replies.length > 0">
                          <template v-for="reply in [...data.replies].reverse()">
                            <CListGroupItem
                              :to="'/admin/ticket/edit/' + reply.ticketID"
                              color="info"
                              class="flex-column align-items-start my-2"
                              :key="reply.ticketID"
                            >
                              <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{{ reply.title }}</h5>
                                <div>
                                  <small>
                                    {{
                                      new Date(reply.date).toLocaleString(
                                        "fa-IR",
                                        {
                                          hour: "2-digit",
                                          second: "2-digit",
                                          minute: "2-digit",
                                        }
                                      )
                                    }}
                                    <CIcon size="sm" name="cil-clock" />
                                  </small>
                                  -
                                  <small>
                                    {{
                                      new Date(reply.date).toLocaleString(
                                        "fa-IR",
                                        {
                                          year: "numeric",
                                          month: "2-digit",
                                          day: "2-digit",
                                        }
                                      )
                                    }}
                                    <CIcon size="sm" name="cil-calendar" />
                                  </small>
                                </div>
                              </div>
                              <p class="mb-1">
                                <CIcon size="sm" name="cil-chat-bubble" />
                                <div v-html="$sanitize(reply.description)"></div>
                              <!-- eslint-disable-next-line vue/no-parsing-error -->
                              </p>
                              <small v-if="reply.personID || reply.userID">
                                <CIcon size="sm" name="cil-user" />
                                {{
                                  reply.personID ? personsObjectMappedById[reply.personID] : 'ادمین'
                                }}</small
                              >
                            </CListGroupItem>
                          </template>
                        </template>
                        <template v-else>
                          <CListGroupItem
                            color="info"
                            class="flex-column align-items-start my-2"
                          >
                            <div class="d-flex w-100 justify-content-center">
                              <h5 class="mb-1">
                                به این تیكت پاسخي داده نشده نشده است.
                              </h5>
                            </div>
                          </CListGroupItem>
                        </template>
                  </CListGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CTab>
        <CTab title="پیوست‌ها">
          <CCardBody style="max-height: calc(100vh - 240px); overflow: auto">
            <CRow>
              <CCol sm="3" v-if="data && data.attachments && data.attachments.length > 0">
                <a  
                  v-for="(attachment, index) in data.attachments"
                  :key="'attachment' + index" 
                  :href="'http://admin.aptar.ir/' + attachment" target="_blank"
                  style="text-decoration: none;"
                >
                  <CListGroupItem                 
                  color="info"
                  class="flex-column align-items-start my-2"
                  >
                    <div class="d-flex w-100 justify-content-center">
                      <h5 class="mb-1">{{ attachment.slice(attachment.lastIndexOf('/') + 1) }}</h5>
                    </div>
                  </CListGroupItem>
                </a>
              </CCol>
              <CCol sm="12" v-else>
                <CListGroupItem
                color="info"
                class="flex-column align-items-start my-2"
                >
                  <div class="d-flex w-100 justify-content-center">
                    <h5 class="mb-1">این تیکت پیوست ندارد</h5>
                  </div>
                </CListGroupItem>
              </CCol>
            </CRow>
          </CCardBody>
        </CTab>
      </CTabs>
    </div>
  </CCard>
</template>

<script>
import { getOne, reply, updateStatus } from "../../../services/ticket";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      showPass: false,
      data: {},
      editorOption: {
        placeholder: "متن جواب را وارد کنید...",
        formats: {
          direction: "right",
          background: "red",
          align: "right",
        },
      },
      performingAction: false,
      infoFetched: false,
      accordion: 0,
      replyTitle: "",
      replyDescription: "",
    };
  },
  computed: {
    ticketStatusTypesArray() {
      return this.$store.state.ticketStatusesArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
    personsObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.personsArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      return optionTypesObject;
    },
    ticketStatusesObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.ticketStatusesArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      return optionTypesObject;
    },
    personsArr() {
      return this.$store.state.personsArray.map((stateObj) => ({
        label: stateObj.title,
        value: stateObj.id,
      }));
    },
  },
  methods: {
    async fetchInfo() {
      const self = this;
      try {
        const { data } = await getOne(self.$route.params.id);
        self.data = { ...data };
        self.infoFetched = true;
      } catch (ex) {
        console.log(ex);
      }
      this.loader.hide();
    },
    redirectToStore() {
      setTimeout(() => this.$router.push({ name: "ticket" }), 2000);
    },
    handleSubmit() {
      this.updateInfo.call(this);
      this.fetchInfo()
    },
    async submitReply() {
      this.performingAction = true;
      const self = this;
      const replyData = {
        ticketID: self.$route.params.id,
        title: self.replyTitle,
        description: self.replyDescription,
      };
      try {
        const res = await reply(replyData);
      } catch (ex) {
        console.log(ex);
      }
      self.performingAction = false;
      self.fetchInfo();
    },
    async updateInfo() {
      this.performingAction = true;
      const self = this;
      const statusData = {
        ticketID: self.$route.params.id,
        ticketStatusID: self.data.ticketStatusID,
      };
      try {
        const data = await updateStatus(statusData);
      } catch (ex) {
        console.log(ex);
      }
      self.performingAction = false;
      self.fetchInfo();
    },
    onEditorChange({ html }) {
      this.replyDescription = html;
    },
    onEditorReady(quill) {
      quill.format("align", "right");
      console.log("editor ready!", quill);
    },
  },
  created() {
    this.loader = this.$loading.show({
      loader: "bars",
      color: "#3399FF",
      blur: "100px",
      opacity: 0.65,
      "lock-scroll": "true",
      "can-cancel": "false",
      "is-full-page": "true",
    });
    this.fetchInfo();
  },
};
</script>
