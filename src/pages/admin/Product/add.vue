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
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "نام را بصورت صحیح وارد کنید",
        },
        {
          name: "path",
          type: "text",
          persianLabel: "مسیر",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "مسیر را بصورت صحیح وارد کنید",
        },
        {
          name: "parameter",
          type: "text",
          persianLabel: "پارامتر",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "پارامتر را بصورت صحیح وارد کنید",
        },
        {
          name: "categoryID",
          type: "option",
          options: self.categoriesArr,
          persianLabel: "دسته بندی",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "دسته بندی را انتخاب کنید",
        },
        {
          name: "serverID",
          type: "option",
          options: self.serversArr,
          persianLabel: "سرور",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "سرور را انتخاب کنید",
        },
        {
          name: "stock",
          type: "number",
          persianLabel: "موجودی",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && !Number.isNaN(val),
          invalidFeedback: "موجودی را بصورت صحیح وارد کنید",
        },
        {
          name: "price",
          type: "text",
          persianLabel: "قیمت",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && !Number.isNaN(val),
          invalidFeedback: "قیمت را بصورت صحیح وارد کنید",
        },
        {
          name: "softwareName",
          type: "text",
          persianLabel: "نام نرم‌افزار",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "نام نرم‌افزار را وارد کنید",
        },
        {
          name: "softwareInstalledPath",
          type: "text",
          persianLabel: "مسیر نصب",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "مسیر نصب را وارد کنید",
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
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "مقدار را مشخص کنید",
        },
        {
          name: "allowExecuteExe",
          type: "switch",
          persianLabel: "مجوز فراخوانی exe",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "مقدار را مشخص کنید",
        },
        {
          name: "isActive",
          type: "switch",
          persianLabel: "وضعیت کالا",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "وضعیت کالا را مشخص کنید",
        },
        {
          name: "hasStock",
          type: "switch",
          persianLabel: "قابلیت فروش",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val,
          invalidFeedback: "قابلیت فروش را مشخص کنید",
        },
      ];
    },
  },
};
</script>