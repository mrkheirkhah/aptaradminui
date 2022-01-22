<template>
  <EditDataCard
    title="title"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/paytype/"
    store-name="نوع پرداخت ها"
    deleteIdField="payTypeID"
    :fields="fields"
    storePageName="storePayType"
    :fetchInfoMethod="getOne"
    :updateInfoMethod="updateInfo"
    :deleteInfoMethod="remove"
    :keysToPost="keysToPost"
    :categoryUpdateActions="categoryUpdateActions"
  />
</template>

<script>
import { update, getOne } from "../../../services/pay/type";
import EditDataCard from "../../../components/base/EditDataCard.vue";
export default {
  components: { EditDataCard },
  data() {
    return {
      add: () =>
        Promise.reject("حذف نوع پرداخت امانپذیر نیست") &&
        alert("حذف نوع پرداخت امانپذیر نیست"),
      updateInfo: (a, b, c) => {
        update(a, b, c);
        this.$store.dispatch("fetchPayTypes", null, { root: true });
      },
      remove: () =>
        Promise.reject("حذف نوع پرداخت امانپذیر نیست") &&
        alert("حذف نوع پرداخت امانپذیر نیست"),
      getOne,
      keysToPost: ["title", "isActive", "payTypeID"],
      categoryUpdateActions: ["fetchPayTypes"],
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "title",
          type: "text",
          persianLabel: "نام",
          col: "6",
          isRequired: true,
          validationFunction: (val) => val && val !== "",
          invalidFeedback: "لطفا نام را وارد کنید",
        },
        {
          name: "isActive",
          type: "switch",
          persianLabel: "وضعیت",
          col: "6",
        },
      ];
    },
  },
};
</script>
