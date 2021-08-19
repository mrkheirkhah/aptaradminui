const editPageMixin = {
  data() {
    return { performingAction: false };
  },
  computed: {},
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
      for (const key in this.userData) {
        if (!this.keysToPost.includes(key)) {
          delete this.userData[key];
        }
      }
      try {
        await this.updateInfoMethod({ ...self.userData });
        self.redirectToStore();
      } catch (ex) {}
      self.performingAction = false;
    },
    async deleteInfo() {
      this.performingAction = true;
      const self = this;
      try {
        await this.deleteInfoMethod({ personID: self.userData.personID });
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
