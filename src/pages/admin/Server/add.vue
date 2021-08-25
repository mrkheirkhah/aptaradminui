<template>
  <AddDataCard
    title="ثبت سرور جدید"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/server/"
    store-name="همه سرورها"
    :fields="fields"
    storePageName="storeServer"
    :addInfoMethod="add"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { add } from "../../../services/server";
import AddDataCard from "../../../components/base/AddDataCard.vue";
export default {
  components: { AddDataCard },
  data() {
    return {
      add,
      keysToPost: [
        "title",
        "loadBalance",
        "address",
        "ip",
        "macAddress",
        "version",
        "isActive",
      ],
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "title",
          persianLabel: "نام",
          type: "text",
          col: "6",
        },
        {
          name: "loadBalance",
          persianLabel: "لود بالانس",
          type: "text",
          col: "6",
        },
        {
          name: "address",
          persianLabel: "آدرس",
          type: "text",
          col: "6",
        },
        {
          name: "ip",
          persianLabel: "ای پی",
          type: "text",
          col: "6",
        },
        {
          name: "macAddress",
          persianLabel: "مک آدرس",
          type: "text",
          col: "6",
        },
        {
          name: "version",
          persianLabel: "ورژن",
          type: "text",
          col: "6",
        },
        {
          name: "isActive",
          persianLabel: "وضعیت",
          type: "switch",
          col: "12",
        },
      ];
    },
  },
};
</script>
