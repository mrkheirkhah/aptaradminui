const storePageMixin = {
  data() {
    return {
      gridData: {
        index: 0,
        size: null,
        count: null,
        data: null,
      },
      fetchOptions: {
        filters: [],
        sort: null,
        index: 0,
        size: 12,
      },
    };
  },
  computed: {
    options() {
      return {
        filters: this.fetchOptions.filters,
        sort: this.fetchOptions.sort,
        index: this.fetchOptions.index,
        size: this.fetchOptions.size,
      };
    },
    getGridFields() {
      return this.showColumns;
    },
    getGridData() {
      return this.gridData.data;
    },
  },
  methods: {
    async fetchInitialData() {
      try {
        const { data } = await this.fetchAll(this.options);
        data.data.map((dataObj) => {
          for (const key in dataObj) {
            if (dataObj[key] === null) {
              dataObj[key] = "";
            }
          }
          return dataObj;
        });
        this.gridData = { ...data };
      } catch (ex) {
        console.log(ex);
      }
      this.loader.hide();
    },
    async fetchMoreData(options) {
      const self = this;
      try {
        const { data } = await this.fetchAll(options);
        if (data.data.length < 1) return;
        const itemsCount = self.fetchOptions.index * data.size;
        self.gridData.data.length = itemsCount < 0 ? 0 : itemsCount;
        self.gridData.data = [...self.gridData.data, ...data.data];
      } catch (ex) {
        console.log(ex);
      }
    },
    getProperFilterType() {
      return "Contains";
    },
    pageChange(pageNumber) {
      const lastPage = this.fetchOptions.Index + 1;
      const currentPage = pageNumber - 1;
      this.fetchOptions.index = currentPage;
      this.fetchOptions.size = this.gridData.size;
      if (lastPage < currentPage) return;
      if (this.gridData.data.length === this.gridData.count) return;
      this.fetchMoreData.call(this, this.options);
    },
    sorterChange({ asc, column }) {
      this.fetchOptions.sort = {
        column: column,
        type: asc ? "Asc" : "Desc",
      };
      this.fetchInitialData();
    },
    columnFilterChange(keyWordsMappedWithColumnNamesObject) {
      this.fetchOptions.filters = [];
      for (const key in keyWordsMappedWithColumnNamesObject) {
        if (key === "index") continue;
        this.fetchOptions.filters.push({
          column: key,
          type: this.getProperFilterType(key),
          value: keyWordsMappedWithColumnNamesObject[key],
        });
      }
      this.fetchInitialData();
    },
  },

  mounted() {
    this.loader = this.$loading.show({
      loader: "bars",
      color: "#3399FF",
      blur: "100px",
      opacity: 0.65,
      "lock-scroll": "true",
      "can-cancel": "false",
      "is-full-page": "true",
    });
    this.fetchInitialData();
  },
};

export default storePageMixin;
