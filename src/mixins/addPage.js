const addPageMixin = {
  data() {
    return {
      data: {},
      performingAction: false,
    };
  },
  methods: {
    async addInfo() {
      this.performingAction = true;
      const self = this;
      for (const key in self.data) {
        if (!self.keysToPost.includes(key)) {
          delete self.data[key];
        }
      }
      try {
        await self.addInfoMethod({ ...self.data });
        self.redirectToStore();
      } catch (ex) {}
      self.performingAction = false;
    },

    redirectToStore() {
      setTimeout(() => this.$router.push({ name: this.storePageName }), 2000);
    },
  },
  created() {
    for (const field of this.fields) {
      this.data[field.name] = null;
    }
  },
};

export default addPageMixin;
