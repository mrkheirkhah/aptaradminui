<template>
  <EditDataCard
    title="title"
    icon="cil-applications"
    store-icon="cil-applications"
    store-link="/admin/server/"
    store-name="همه سرورها"
    :fields="fields"
    deleteIdField="serverID"
    storePageName="storeServer"
    :fetchInfoMethod="getOne"
    :updateInfoMethod="update"
    :deleteInfoMethod="remove"
    :keysToPost="keysToPost"
  />
</template>

<script>
import { add, update, remove, getOne } from "../../../services/server";
import EditDataCard from "../../../components/base/EditDataCard.vue";
export default {
  components: { EditDataCard },
  data() {
    return {
      add,
      update,
      remove,
      getOne,
      keysToPost: [
        "title",
        "loadBalance",
        "address",
        "ip",
        "macAddress",
        "version",
        "isActive",
        "serverID",
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