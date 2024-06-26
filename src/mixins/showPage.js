const showPageMixin = {
  data() {
    return {};
  },
  computed: {},
  methods: {
    async fetchInfo() {
      const self = this;
      try {
        const { data } = await this.fetchInfoMethod(self.$route.params.id);
        if (!Array.isArray(data)) {
          self.data = { ...data };
        } else if (Array.isArray(data)) {
          self.data = data;
        }
      } catch (ex) {
        console.log(ex);
      }
      this.loader.hide();
    },
    updateCategoriesIfHave() {
      for (const category of this.categoryUpdateActions) {
        this.$store.dispatch(category, null, { root: true });
      }
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

export default showPageMixin;
