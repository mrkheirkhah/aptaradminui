const addPageMixin = {
  data() {
    return {
      performingAction: false,
    };
  },
  methods: {
    async addInfo() {
      this.performingAction = true;
      const self = this;
      for (const key in this.data) {
        if (!this.keysToPost.includes(key)) {
          delete this.data[key];
        }
      }
      try {
        await this.addInfoMethod({ ...self.data });
        this.redirectToStore();
      } catch (ex) {}
      this.performingAction = false;
    },

    redirectToStore() {
      setTimeout(() => this.$router.push({ name: this.storePageName }), 2000);
    },
  },
};

export default addPageMixin;
