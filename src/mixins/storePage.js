import { captalizeFirstLetter } from "@/utils";
const storePageMixin = {
  data() {
    return {
      gridData: {
        Index: 0,
        Size: null,
        Count: null,
        Data: null,
      },
      fetchOptions: {
        Filters: [],
        Sort: null,
        Index: 0,
        Size: 12,
      },
    };
  },
  computed: {
    options() {
      return {
        Filters: this.fetchOptions.Filters,
        Sort: this.fetchOptions.Sort,
        Index: this.fetchOptions.Index,
        Size: this.fetchOptions.Size,
      };
    },
    getGridFields() {
      return this.showColumns;
    },
    getGridData() {
      return this.gridData.data;
    },
    currentRoute() {
      return this.$route.path;
    },
  },
  methods: {
    async fetchInitialData() {
      const self = this;
      try {
        if (
          !self.gridData.Data &&
          !self.gridData.data &&
          self.currentRoute.includes("ticket")
        ) {
          this.options.Sort = {
            column: "updateDate",
            type: "Desc",
          };
        }
        const { data } = await this.fetchAll(this.options);
        if (!Array.isArray(data)) {
          data.data.map((dataObj) => {
            if (self.currentRoute.includes("productoption/store")) {
              dataObj.title = dataObj.option.title;
            }
            for (const key in dataObj) {
              if (dataObj[key] === null) {
                dataObj[key] = "";
              }
            }
            return dataObj;
          });
          this.gridData = { ...data };
        } else if (data && Array.isArray(data)) {
          this.gridData = {
            index: 0,
            size: data.length,
            count: data.length,
            data: data,
          };
        }
      } catch (ex) {
        console.log(ex);
      }
      this.loader.hide();
    },
    async fetchMoreData(options) {
      const self = this;
      try {
        const { data } = await this.fetchAll(options);
        if (!Array.isArray(data)) {
          data.data.map((dataObj) => {
            for (const key in dataObj) {
              if (dataObj[key] === null) {
                dataObj[key] = "";
              }
            }
            return dataObj;
          });
        }
        if (data.data.length < 1) return;
        const itemsCount = self.fetchOptions.Index * data.size;
        self.gridData.data.length = itemsCount < 0 ? 0 : itemsCount;
        self.gridData.data = [...self.gridData.data, ...data.data];
      } catch (ex) {
        console.log(ex);
      }
    },
    resetInitialFetchOptions() {
      this.fetchOptions.Index = 0;
      this.fetchOptions.Size = 12;
    },
    getProperFilterType(key, val) {
      const fieldType = typeof val;
      switch (fieldType) {
        case "string":
          return "Contains";
        case "boolean":
          return "Equals";
        case "number":
          return "Equals";
        // case "string":
        // return "EndsWith";
        // case "string":
        // return "Equals";
        // case "number":
        // return "GreaterThan";
        // case "number":
        // return "GreaterThanOrEqual";
        // case "number":
        // return "LessThan";
        // case "number":
        // return "LessThanOrEqual";
        // case "number":
        // return "NotEqual";
        default:
          return "Contains";
      }
    },
    pageChange(pageNumber) {
      const lastPage = this.fetchOptions.Index + 1;
      const currentPage = pageNumber - 1;
      this.fetchOptions.Index = currentPage;
      this.fetchOptions.Size = this.gridData.size;
      if (lastPage < currentPage) return;
      if (this.gridData.data.length === this.gridData.count) return;
      this.fetchMoreData.call(this, this.options);
    },
    paginationChange(rowsCount) {
      this.resetInitialFetchOptions();
      this.fetchOptions.Size = rowsCount + 2;
      this.fetchInitialData();
    },
    sorterChange({ asc, column }) {
      if (column)
        this.fetchOptions.Sort = {
          column: column,
          type: asc ? "Asc" : "Desc",
        };
      else this.fetchOptions.Sort = null;
      this.fetchInitialData();
    },
    columnFilterChange(keyWordsMappedWithColumnNamesObject) {
      this.fetchOptions.Filters = [];
      for (const key in keyWordsMappedWithColumnNamesObject) {
        if (key === "index" || key === "actions") continue;
        if (keyWordsMappedWithColumnNamesObject[key] === "") continue;
        if (
          Array.isArray(keyWordsMappedWithColumnNamesObject[key]) &&
          keyWordsMappedWithColumnNamesObject[key][0] === "date"
        ) {
          this.fetchOptions.Filters.push(
            keyWordsMappedWithColumnNamesObject[key][1]
          );
          continue;
        }
        this.fetchOptions.Filters.push({
          Column: captalizeFirstLetter(key),
          Type: this.getProperFilterType(
            key,
            keyWordsMappedWithColumnNamesObject[key]
          ),
          Value: keyWordsMappedWithColumnNamesObject[key],
        });
      }
      this.fetchInitialData();
    },
    deleteInfo(obj) {
      const submitDelete = async () => {
        if (!this.deleteInfoMethod) return;
        const self = this;
        const dataToSend = {};
        dataToSend[self.deleteIdField] = obj[self.deleteIdField];
        try {
          await self.deleteInfoMethod({ data: dataToSend });
          // self.fetchInitialData();
          self.gridData.data = self.gridData.data.filter(
            (field) => field[self.deleteIdField] !== obj[self.deleteIdField]
          );
          this.updateCategoriesIfHave();
        } catch (ex) {
          console.log(ex);
        }
      };
      const event = new Event("getDeleteConfirmation");
      event.deletionCallback = submitDelete;
      window.dispatchEvent(event);
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
    this.fetchInitialData();
    const self = this;
    window.addEventListener("clearAllDataGridFilters", () => {
      self.fetchOptions = {
        Filters: [],
        Sort: null,
        Index: 0,
        Size: 12,
      };
      self.fetchInitialData();
    });
  },
};

export default storePageMixin;
