<template>
  <EditDataCard
    title="title"
    icon="cil-basket"
    store-icon="cil-basket"
    store-link="/admin/product/"
    store-name="همه محصولات"
    :fields="fields"
    deleteIdField="productID"
    storePageName="storeProducts"
    :fetchInfoMethod="getProduct"
    :updateInfoMethod="updateProduct"
    :deleteInfoMethod="deleteProduct"
    :keysToPost="keysToPost"
    :categoryUpdateActions="categoryUpdateActions"
  />
</template>

<script>
import { getProduct, updateProduct, deleteProduct } from "@/services/product";
import EditDataCard from "../../../components/base/EditDataCard.vue";
export default {
  components: { EditDataCard },
  data() {
    return {
      getProduct,
      categoryUpdateActions: ["fetchProducts"],
      updateProduct,
      deleteProduct,
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
        "productID",
      ],
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
          validationFunction: (val) => val && val !== "",
          invalidFeedback: "نام را بصورت صحیح وارد کنید",
        },
        {
          name: "path",
          type: "text",
          persianLabel: "مسیر",
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "مسیر را بصورت صحیح وارد کنید",
        },
        {
          name: "parameter",
          type: "text",
          persianLabel: "پارامتر",
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "پارامتر را بصورت صحیح وارد کنید",
        },
        {
          name: "categoryID",
          type: "option",
          options: self.categoriesArr,
          persianLabel: "دسته بندی",
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "دسته بندی را انتخاب کنید",
        },
        {
          name: "serverID",
          type: "option",
          options: self.serversArr,
          persianLabel: "سرور",
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "سرور را انتخاب کنید",
        },
        {
          name: "stock",
          type: "text",
          persianLabel: "موجودی",
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "موجودی را بصورت صحیح وارد کنید",
        },
        {
          name: "price",
          type: "text",
          persianLabel: "قیمت",
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "قیمت را بصورت صحیح وارد کنید",
        },
        {
          name: "softwareName",
          type: "text",
          persianLabel: "نام نرم‌افزار",
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "نام نرم‌افزار را وارد کنید",
        },
        {
          name: "softwareInstalledPath",
          type: "text",
          persianLabel: "مسیر نصب",
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "مسیر نصب را وارد کنید",
        },
        {
          name: "shortDescription",
          type: "text",
          persianLabel: "توضیحات کوتاه",
          validationFunction: (val) => !val || (val && val !== ""),
          col: "6",
        },
        {
          name: "longDescription",
          type: "textarea",
          persianLabel: "توضیحات",
          validationFunction: (val) => !val || (val && val !== ""),
          col: "12",
        },
        {
          name: "allSoftware",
          type: "switch",
          persianLabel: "دسترسی تمام نرم‌افزارها",
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "مقدار را مشخص کنید",
        },
        {
          name: "allowExecuteExe",
          type: "switch",
          persianLabel: "مجوز فراخوانی exe",
          col: "6",
          validationFunction: (val) => !val || (val && val !== ""),
          invalidFeedback: "مقدار را مشخص کنید",
        },
        {
          name: "isActive",
          type: "switch",
          persianLabel: "وضعیت کالا",
          col: "6",
          invalidFeedback: "وضعیت کالا را مشخص کنید",
        },
        {
          name: "hasStock",
          type: "switch",
          persianLabel: "قابلیت فروش",
          col: "6",
          invalidFeedback: "قابلیت فروش را مشخص کنید",
        },
      ];
    },
  },
};
</script>
