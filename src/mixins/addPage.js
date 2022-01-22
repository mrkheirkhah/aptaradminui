const addPageMixin = {
  data() {
    return {
      data: {},
      subData: {},
      performingAction: false,
      showForm: true,
    };
  },
  methods: {
    cloneData(sub = false) {
      const self = this;
      const fieldName = sub ? "subData" : "data";
      const postKeys = sub ? "subKeysToPost" : "keysToPost";
      const clonedData = JSON.parse(JSON.stringify(self[fieldName]));
      for (const key in clonedData) {
        const fieldObj = self.fields.filter((field) => field.name === key);
        if (fieldObj[0].type === "number") {
          clonedData[key] = +clonedData[key];
        } else if (fieldObj[0].name === "enable") {
                 clonedData[key] = +clonedData[key];
               }
        if (!this[postKeys].includes(key)) {
          delete clonedData[key];
        }
      }
      let formData = JSON.parse(JSON.stringify(clonedData));
      if (this[postKeys].includes("file")) {
        formData = new FormData();
        for (const key in clonedData) {
          if (key === "file") {
            formData.set(key, this.$refs.productImage[0].files.item(0));
          } else formData.set(key, clonedData[key]);
        }
      }

      return formData;
    },
    async addInfo() {
      // this.startSubmitting();
      const self = this;
      const formData = this.cloneData();
      try {
        await self.addInfoMethod(formData);
        this.updateCategoriesIfHave();
        if (!this.hasSubFrom) self.redirectToStore();
      } catch (ex) {
        console.log(ex);
      }
      // this.endSubmiitting();
    },
    startSubmitting() {
      this.performingAction = true;
    },
    endSubmiitting() {
      this.performingAction = false;
    },
    async addSubInfo() {
      this.performingAction = true;
      const self = this;
      const formData = { ...this.cloneData(true), ...this.cloneData() };
      try {
        await self.addSubInfoMethod(formData);
        this.updateCategoriesIfHave();
        self.redirectToStore();
      } catch (ex) {
        console.log(ex);
      }
      self.performingAction = false;
    },
    redirectToStore() {
      setTimeout(() => this.$router.push({ name: this.storePageName }), 2000);
    },
    initiateFields() {
      const flattenChildren = [];
      this.fields.map((obj) => {
        if (obj.children) {
          flattenChildren.push(...obj.children);
        } else {
          flattenChildren.push(obj);
        }
      });
      for (const field of flattenChildren) {
        if (field.type === "switch") {
          this.data[field.name] = field.name === "isActive" ? true : false;
        } else if (field.type === "number") {
          this.data[field.name] = 0;
        } else if (field.type === "option") {
          this.data[field.name] = null;
        } else if (field.type === "text" || field.type === "textarea") {
          this.data[field.name] = "";
        } else this.data[field.name] = null;
      }
    },
    initiateSubFields() {
      for (const subField of this.subFields) {
        if (subField.type === "switch") {
          this.subData[subField.name] =
            subField.name === "isActive" ? true : false;
        } else if (subField.type === "number") {
          this.subData[subField.name] = 0;
        } else if (subField.type === "option") {
          this.subData[subField.name] = 0;
        } else if (subField.type === "text") {
          this.subData[subField.name] = "";
        } else this.subData[subField.name] = null;
      }
    },
    updateCategoriesIfHave() {
      for (const category of this.categoryUpdateActions) {
        this.$store.dispatch(category, null, { root: true });
      }
    },
  },
  created() {
    this.initiateFields();
    if (this.hasSubFrom) {
      this.initiateSubFields();
    }
  },
};

export default addPageMixin;
