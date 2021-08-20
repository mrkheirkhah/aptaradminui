<template>
  <div>
    <ShowDataCard
      :title="data.title"
      icon="cil-applications"
      store-link="/admin/subscription/"
      store-name="همه اشتراک‌ها"
      :fieldsToShow="fieldsToShow"
    />
  </div>
</template>

<script>
import { getOne } from "../../../services/subscription";
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
        subscriptionTypeID: "",
        value: "",
        isActive: true,
        subscriptionID: 0,
      },
    };
  },
  computed: {
    subscriptionTypesObjectMappedById() {
      const subscriptionTypesObject = {};
      this.$store.state.subscriptionTypesArray.map((stateObj) => {
        subscriptionTypesObject[stateObj.id] = stateObj.title;
      });
      return subscriptionTypesObject;
    },
    fieldsToShow() {
      const self = this;
      return [
        {
          filedName: "subscriptionID",
          persianName: "کد اشتراک",
          type: "text",
          data: self.data.subscriptionID,
          col: "6",
        },
        {
          filedName: "subscriptionTypeID",
          persianName: "نوع اشتراک",
          type: "option",
          data: self.subscriptionTypesObjectMappedById[
            self.data.subscriptionTypeID
          ],
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