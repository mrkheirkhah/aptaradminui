<template>
  <CModal title="حذف" color="danger" :show.sync="confirmatioModal">
    آیا از حذف اطمینان دارید؟
    <template #footer>
      <CButton size="sm" class="m-2" @click="hideModal">
        بستن
      </CButton>
      <CButton color="danger" class="m-2" @click="deletionConfirmed">
        حذف
      </CButton>
    </template>
  </CModal>
</template>

<script>
export default {
  data() {
    return {
      confirmatioModal: false,
      deletionCallback: null,
    };
  },
  mounted() {
    const self = this;
    window.addEventListener("getDeleteConfirmation", (e) => {
      if (e.deletionCallback) {
        self.deletionCallback = e.deletionCallback;
        self.confirmatioModal = true;
      }
    });
  },
  methods: {
    deletionConfirmed() {
      if (this.deletionCallback instanceof Function) this.deletionCallback();
      this.confirmatioModal = false;
      this.deletionCallback = null;
    },
    hideModal() {
      this.confirmatioModal = false;
      this.deletionCallback = null;
    },
  },
};
</script>

<style lang="scss" scoped></style>
