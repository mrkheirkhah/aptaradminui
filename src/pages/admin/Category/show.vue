<template>
  <div>
    <ShowDataCard
      :title="data.title"
      icon="cil-applications"
      store-link="/admin/category/"
      store-name="همه دسته‌بندی‌ها"
      :fieldsToShow="fieldsToShow"
      :categoryUpdateActions="categoryUpdateActions"
    />
  </div>
</template>

<script>
import { getOne } from "../../../services/category";
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
        isActive: true,
        categoryID: 0,
        categoryUpdateActions: ["fetchCategories"],
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
          type: "text",
          data: self.data.title,
          col: "6",
        },
        {
          filedName: "isActive",
          persianName: "وضعیت",
          type: "switch",
          data: self.properStatus(self.data.isActive),
          col: "12",
        },
      ];
    },
  },
};
</script>
