<template>
  <div>
    <ShowDataCard
      v-if="data.title"
      :title="data.title"
      icon="cil-basket"
      store-link="/admin/product/"
      store-name="همه محصولات"
      :fieldsToShow="fieldsToShow"
    />
  </div>
</template>

<script>
import showPageMixin from "../../../mixins/showPage";
import { getProduct } from "@/services/product";
import ShowDataCard from "../../../components/base/ShowDataCard.vue";
import { properStatus } from "../../../utils";
export default {
  mixins: [showPageMixin],
  components: { ShowDataCard },
  data() {
    return {
      properStatus,
      fetchInfoMethod: getProduct,
      data: {
        title: null,
        path: null,
        parameter: null,
        categoryID: null,
        isActive: null,
        allSoftware: null,
        allowExecuteExe: null,
        serverID: null,
        hasStock: null,
        stock: null,
        price: null,
        shortDescription: null,
        longDescription: null,
        softwareName: null,
        softwareInstalledPath: null,
        productID: null,
      },
    };
  },
  computed: {
    fieldsToShow() {
      const self = this;
      return [
        {
          filedName: "title",
          persianName: "نام",
          type: "",
          data: self.data.title,
          col: "6",
        },
        {
          filedName: "path",
          persianName: "مسیر",
          type: "",
          data: self.data.path,
          col: "6",
        },
        {
          filedName: "parameter",
          persianName: "پارامتر",
          type: "",
          data: self.data.parameter,
          col: "6",
        },
        {
          filedName: "categoryID",
          persianName: "دسته بندی",
          type: "",
          data: self.data.categoryID,
          col: "6",
        },
        {
          filedName: "allSoftware",
          persianName: "نرم‌افزار کل",
          type: "",
          data: self.data.allSoftware,
          col: "6",
        },
        {
          filedName: "allowExecuteExe",
          persianName: "مجوز فراخوانی exe",
          type: "",
          data: self.data.allowExecuteExe,
          col: "6",
        },
        {
          filedName: "serverID",
          persianName: "آیدی سرور",
          type: "",
          data: self.data.serverID,
          col: "6",
        },
        {
          filedName: "hasStock",
          persianName: "قابل فروش",
          type: "",
          data: self.properStatus(self.data.hasStock),
          col: "6",
        },
        {
          filedName: "stock",
          persianName: "موجودی",
          type: "",
          data: self.data.stock,
          col: "6",
        },
        {
          filedName: "softwareName",
          persianName: "نام نرم‌افزار",
          type: "",
          data: self.data?.softwareName,
          col: "6",
        },
        {
          filedName: "softwareInstalledPath",
          persianName: "مسیر نصب نرم‌افزار",
          type: "",
          data: self.data.softwareInstalledPath,
          col: "6",
        },
        {
          filedName: "shortDescription",
          persianName: "توضیحات کوتاه",
          type: "",
          data: self.data.shortDescription,
          col: "6",
        },
        {
          filedName: "longDescription",
          persianName: "توضیحات",
          type: "",
          data: self.data.longDescription,
          col: "12",
        },
        {
          filedName: "isActive",
          persianName: "وضعیت",
          type: "",
          data: self.properStatus(self.data.isActive),
          col: "12",
        },
      ];
    },
  },
};
</script>