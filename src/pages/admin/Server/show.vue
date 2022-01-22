<template>
  <div>
    <ShowDataCard
      :title="data.title"
      icon="cil-applications"
      store-link="/admin/server/"
      store-name="همه سرورها"
      :fieldsToShow="fieldsToShow"
      :categoryUpdateActions="categoryUpdateActions"
    />
  </div>
</template>

<script>
import { getOne } from "../../../services/server";
import showPageMixin from "../../../mixins/showPage";
import ShowDataCard from "../../../components/base/ShowDataCard.vue";
import { properStatus } from "../../../utils";
export default {
  mixins: [showPageMixin],
  components: { ShowDataCard },
  data() {
    return {
      properStatus,
      categoryUpdateActions: ["fetchServers"],
      fetchInfoMethod: getOne,
      data: {
        title: "",
        loadBalance: "",
        address: "",
        ip: "",
        macAddress: "",
        version: "",
        isActive: true,
        serverID: 0,
      },
    };
  },
  computed: {
    fieldsToShow() {
      const self = this;
      return [
        {
          filedName: "serverID",
          persianName: "کد سرور",
          type: "text",
          data: self.data.serverID,
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
          filedName: "loadBalance",
          persianName: "لود بالانس",
          type: "text",
          data: self.data.loadBalance,
          col: "6",
        },
        {
          filedName: "address",
          persianName: "آدرس",
          type: "text",
          data: self.data.address,
          col: "6",
        },
        {
          filedName: "ip",
          persianName: "ای پی",
          type: "text",
          data: self.data.ip,
          col: "6",
        },
        {
          filedName: "macAddress",
          persianName: "مک آدرس",
          type: "text",
          data: self.data.macAddress,
          col: "6",
        },
        {
          filedName: "version",
          persianName: "ورژن",
          type: "text",
          data: self.data.version,
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
