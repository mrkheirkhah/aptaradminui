const editPageMixin = {
  data() {
    return { data: {}, performingAction: false };
  },
  methods: {
    async fetchInfo() {
      const self = this;
      try {
        const { data } = await this.fetchInfoMethod(self.$route.params.id);
        self.data = { ...data };
      } catch (ex) {}
      this.loader.hide();
    },
    redirectToStore() {
      setTimeout(() => this.$router.push({ name: this.storePageName }), 2000);
    },
    async updateInfo() {
      this.performingAction = true;
      const self = this;
      for (const key in self.data) {
        if (!self.keysToPost.includes(key)) {
          delete self.data[key];
        }
      }
      const formData = new FormData();
      for (const key in self.data) {
        formData.append(key, self.data[key]);
      }
      try {
        await self.updateInfoMethod(formData);
        self.redirectToStore();
      } catch (ex) {}
      self.performingAction = false;
    },
    async deleteInfo() {
      this.performingAction = true;
      const self = this;
      const dataToSend = {};
      dataToSend[self.deleteIdField] = self.data[self.deleteIdField];
      debugger;
      try {
        await self.deleteInfoMethod(dataToSend);
        self.redirectToStore();
      } catch (ex) {}
      self.performingAction = false;
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

export default editPageMixin;
