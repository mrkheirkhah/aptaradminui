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
      let formData = { ...self.data };
      if (self.keysToPost.includes("file")) {
        formData = new FormData();
        for (const key in self.data) {
          if (key === "file") {
            formData.set(key, self.$refs.productImage[0].state.item(0));
          } else formData.set(key, self.data[key]);
        }
      }
      try {
        await self.addInfoMethod(formData);
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
      if (field.name === "isActive") this.data[field.name] = true;
    }
  },
};

export default addPageMixin;
