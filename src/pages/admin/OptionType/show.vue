<template>
  <div>
    <ShowDataCard
      :title="data.title"
      icon="cil-applications"
      store-link="/admin/optiontype/"
      store-name="نوع آپشن ها"
      :fieldsToShow="fieldsToShow"
      :categoryUpdateActions="categoryUpdateActions"
    />
  </div>
</template>

<script>
import { getOne } from "../../../services/option/type";
import showPageMixin from "../../../mixins/showPage";
import ShowDataCard from "../../../components/base/ShowDataCard.vue";
export default {
  mixins: [showPageMixin],
  components: { ShowDataCard },
  data() {
    return {
      fetchInfoMethod: getOne,
      categoryUpdateActions: ["fetchOptionTypes"],
      data: {
        title: "",
        optionTypeID: 0,
      },
    };
  },
  computed: {
    fieldsToShow() {
      const self = this;
      return [
        {
          filedName: "optionTypeID",
          persianName: "کد",
          type: "text",
          data: self.data.optionTypeID,
          col: "6",
        },
        {
          filedName: "title",
          persianName: "نام",
          type: "text",
          data: self.data.title,
          col: "6",
        },
      ];
    },
  },
};
</script>
