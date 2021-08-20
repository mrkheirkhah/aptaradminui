<template>
  <div>
    <ShowDataCard
      :title="data.title"
      icon="cil-applications"
      store-link="/admin/option/"
      store-name="همه تنظیمات"
      :fieldsToShow="fieldsToShow"
    />
  </div>
</template>

<script>
import { getOne } from "../../../services/option";
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
        optionTypeID: "",
        value: "",
        isActive: true,
        optionID: 0,
      },
    };
  },
  computed: {
    optionTypesObjectMappedById() {
      const optionTypesObject = {};
      this.$store.state.optionTypesArray.map((stateObj) => {
        optionTypesObject[stateObj.id] = stateObj.title;
      });
      return optionTypesObject;
    },
    fieldsToShow() {
      const self = this;
      return [
        {
          filedName: "optionID",
          persianName: "کد تنظیمات",
          type: "text",
          data: self.data.optionID,
          col: "6",
        },
        {
          filedName: "optionTypeID",
          persianName: "نوع تنظیمات",
          type: "option",
          data: self.optionTypesObjectMappedById[self.data.optionTypeID],
          col: "6",
        },
        {
          filedName: "title",
          persianName: "نام",
          type: "text",
          data: self.data.title,
          col: "6",
        },
        {
          filedName: "value",
          persianName: "مقدار",
          type: "text",
          data: self.data.value,
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