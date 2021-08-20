<template>
  <AddDataCard
    title="ثبت محصول جدید"
    icon="cil-basket"
    store-icon="cil-basket"
    store-link="/admin/product/"
    store-name="همه محصولات"
    :fields="fields"
    storePageName="storeProducts"
    :addInfoMethod="addProduct"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { addProduct } from "../../../services/product";
import AddDataCard from "../../../components/base/AddDataCard.vue";
export default {
  components: { AddDataCard },
  data() {
    return {
      addProduct,
      keysToPost: [
        "title",
        "path",
        "parameter",
        "categoryID",
        "isActive",
        "allSoftware",
        "allowExecuteExe",
        "serverID",
        "hasStock",
        "stock",
        "price",
        "shortDescription",
        "longDescription",
        "softwareName",
        "softwareInstalledPath",
      ],
      data: {
        title: "",
        path: "",
        parameter: "",
        categoryID: "",
        isActive: false,
        allSoftware: false,
        allowExecuteExe: false,
        serverID: "",
        hasStock: false,
        stock: "",
        price: "",
        shortDescription: "",
        longDescription: "",
        softwareName: "",
        softwareInstalledPath: "",
      },
    };
  },
  computed: {
    serversArr() {
      return this.$store.state.serversArray.map((serverObj) => ({
        label: serverObj.title,
        value: serverObj.id,
      }));
    },
    categoriesArr() {
      return this.$store.state.categoriesArray.map((categoryObj) => ({
        label: categoryObj.title,
        value: categoryObj.id,
      }));
    },
    fields() {
      const self = this;
      return [
        {
          name: "title",
          type: "text",
          persianLabel: "نام",
          col: "6",
        },
        {
          name: "path",
          type: "text",
          persianLabel: "مسیر",
          col: "6",
        },
        { name: "parameter", type: "text", persianLabel: "پارامتر", col: "6" },
        {
          name: "categoryID",
          type: "option",
          options: self.categoriesArr,
          persianLabel: "کد دسته بندی",
          col: "6",
        },
        {
          name: "serverID",
          type: "option",
          options: self.serversArr,
          persianLabel: "آیدی سرور",
          col: "6",
        },
        { name: "stock", type: "text", persianLabel: "موجودی", col: "6" },
        { name: "price", type: "text", persianLabel: "قیمت", col: "6" },
        {
          name: "softwareName",
          type: "text",
          persianLabel: "نام نرم‌افزار",
          col: "6",
        },
        {
          name: "softwareInstalledPath",
          type: "text",
          persianLabel: "مسیر نصب",
          col: "6",
        },
        {
          name: "shortDescription",
          type: "text",
          persianLabel: "توضیحات کوتاه",
          col: "6",
        },
        {
          name: "longDescription",
          type: "textarea",
          persianLabel: "توضیحات",
          col: "12",
        },
        {
          name: "allSoftware",
          type: "switch",
          persianLabel: "نرم‌افزار کل",
          col: "6",
        },
        {
          name: "allowExecuteExe",
          type: "switch",
          persianLabel: "مجوز فراخوانی exe",
          col: "6",
        },
        {
          name: "isActive",
          type: "switch",
          persianLabel: "وضعیت کالا",
          col: "6",
        },
        {
          name: "hasStock",
          type: "switch",
          persianLabel: "قابلیت فروش",
          col: "6",
        },
      ];
    },
  },
};
</script>