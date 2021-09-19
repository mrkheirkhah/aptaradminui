<template>
  <div>
    <ShowDataCard
      :title="data.userName"
      icon="cil-user"
      store-link="/admin/person/"
      store-name="همه کاربران"
      :fieldsToShow="fieldsToShow"
    />
  </div>
</template>

<script>
import { getOne } from "../../../services/storage";
import showPageMixin from "../../../mixins/showPage";
import ShowDataCard from "../../../components/base/ShowDataCard.vue";
import { properStatus } from "../../../utils";
export default {
  mixins: [showPageMixin],
  components: { ShowDataCard },
  data() {
    return {
      properStatus,
      fetchInfoMethod: getOne,
      data: {
        title: "",
        price: 0,
        value: "",
        enable: 0,
        timePeriod: 0,
        storageID: 0,
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
          filedName: "price",
          persianName: "قیمت",
          type: "",
          data: self.data.price,
          col: "6",
        },
        {
          filedName: "value",
          persianName: "مقدار",
          type: "",
          data: self.data.value,
          col: "6",
        },
        {
          filedName: "enable",
          persianName: "فعال",
          type: "",
          data: self.data.enable,
          col: "6",
        },
        {
          filedName: "timePeriod",
          persianName: "بازه زمانی",
          type: "",
          data: self.data.timePeriod,
          col: "6",
        },
        {
          filedName: "storageID",
          persianName: "کد",
          type: "",
          data: self.data.storageID,
          col: "6",
        },
      ];
    },
  },
};
</script>