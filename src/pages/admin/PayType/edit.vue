<template>
  <EditDataCard
    title="title"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/paytype/"
    store-name="انواع اشتراک"
    :fields="fields"
    storePageName="storePayType"
    :fetchInfoMethod="getOne"
    :updateInfoMethod="update"
    :deleteInfoMethod="remove"
    :keysToPost="keysToPost"
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
      update,
      remove: () =>
        Promise.reject("حذف نوع پرداخت امانپذیر نیست") &&
        alert("حذف نوع پرداخت امانپذیر نیست"),
      getOne,
      keysToPost: ["title", "isActive", "payTypeID"],
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