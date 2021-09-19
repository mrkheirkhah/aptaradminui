const editPageMixin = {
  data() {
    return { data: {}, performingAction: false, infoFetched: false };
  },
  methods: {
    getProp(obj, prop) {
      return prop.split(".").reduce((r, e) => {
        return r[e];
      }, obj);
    },
    async fetchInfo() {
      const self = this;
      try {
        const { data } = await this.fetchInfoMethod(self.$route.params.id);
        self.data = { ...data };
        self.infoFetched = true;
      } catch (ex) {
        console.log(ex);
      }
      this.loader.hide();
    },
    redirectToStore() {
      setTimeout(() => this.$router.push({ name: this.storePageName }), 2000);
    },
    async updateInfo() {
      this.performingAction = true;
      const self = this;

      const flattenObject = function(ob) {
        var toReturn = {};

        for (var i in ob) {
          // eslint-disable-next-line no-prototype-builtins
          if (!ob.hasOwnProperty(i)) continue;

          if (typeof ob[i] == "object") {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
              // eslint-disable-next-line no-prototype-builtins
              if (!flatObject.hasOwnProperty(x)) continue;

              toReturn[x] = flatObject[x];
            }
          } else {
            toReturn[i] = ob[i];
          }
        }
        return toReturn;
      };

      const flattened = flattenObject(self.data);
      for (const key in flattened) {
        if (!self.keysToPost.includes(key)) {
          delete flattened[key];
        }
      }
      let formData = { ...flattened };
      if (self.keysToPost.includes("file")) {
        formData = new FormData();
        for (const key in flattened) {
          formData.set(key, flattened[key]);
        }
      }
      try {
        await self.updateInfoMethod(formData);
        self.redirectToStore();
      } catch (ex) {
        console.log(ex);
      }
      self.performingAction = false;
    },
    async deleteInfo() {
      this.performingAction = true;
      const self = this;
      const dataToSend = {};
      dataToSend[self.deleteIdField] = self.data[self.deleteIdField];
      try {
        await self.deleteInfoMethod({ data: dataToSend });
        self.redirectToStore();
      } catch (ex) {
        console.log(ex);
      }
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
