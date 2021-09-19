<template>
  <CRow>
    <CCol md="12">
      <CRow>
        <CCol sm="12">
          <ProfileTableWrapper
            :items="getGridData"
            :fields="getGridFields"
            hover
            striped
            border
            small
            fixed
            :caption="gridTitle"
            addNewLink="/admin/profile/add"
            @page-change="pageChange"
            @pagination-change="paginationChange"
            @sorter-change="sorterChange"
            @column-filter-change="columnFilterChange"
            @more-action="moreAction"
            @toggle-profile-state="updateAction"
            @edit-action="editAction"
            @delete-action="deleteInfo"
          />
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>

<script>
import ProfileTableWrapper from "@/components/TableWrappers/ProfileTableWrapper.vue";
import { update, getAll, remove } from "../../../services/Profile";
import storePageMixin from "../../../mixins/storePage";
export default {
  components: { ProfileTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
      deleteInfoMethod: remove,
      deleteIdField: "profileID",
      keysToPost: [
        "profileID",
        "isDefault",
        "profileName",
        "autoRemote",
        "colorDepthID",
        "cachePersistenceActive",
        "enableAutoReconnect",
        "maxReconnectAttempts",
        "redirectDrives",
        "redirectPrinters",
        "redirectClipboard",
        "redirectSmartCards",
        "redirectPorts",
        "redirectDevices",
        "redirectPOSDevices",
        "audioRedirectionMode",
        "disablE_CURSOR_SHADOW",
        "disablE_CURSORSETTINGS",
        "disablE_FULLWINDOWDRAG",
        "disablE_MENUANIMATIONS",
        "disablE_THEMING",
        "disablE_WALLPAPER",
        "enablE_DESKTOP_COMPOSITION",
        "enablE_ENHANCED_GRAPHICS",
        "enablE_FONT_SMOOTHING",
        "softwareRunNumber",
        "softwareRunLength",
        "softwareRunTimeFrom",
        "softwareRunTimeTo",
        "softwareRunSaturday",
        "softwareRunSunday",
        "softwareRunMonday",
        "softwareRunTuesday",
        "softwareRunWednesday",
        "softwareRunThursday",
        "softwareRunFriday",
        "disableDrives",
        "restrictDrives",
        "disableCMD",
        "disableRegistry",
        "disableGPEdit",
        "disableMapDrive",
        "disableShare",
        "disableTaskManager",
        "disableControlPanel",
        "webServer",
        "accessDesktop",
        "disableFolderOption",
        "disableShutdwon",
        "webRedirectDrive",
        "webRedirectPrinter",
        "webColorDepthID",
        "webAudio",
        "webScreenWidth",
        "webScreenHeight",
        "autoLogOffTime",
        "quotaLimitSize",
        "cpuCoreNumber",
        "enableProcessWatcher",
        "showUserProfile",
        "ipFrom",
        "ipTo",
        "storageID",
        "enableNetworkDiscovery",
        "limitTypeID",
        "downloadTrafficLimit",
        "uploadTrafficLimit",
        "downloadUploadTrafficLimit",
        "createDate",
        "userID",
        "deleteDate",
        "limitType",
        "storage",
        "user",
        "colorDepth",
        "webColorDepth",
        "updateDate",
      ],
      showColumns: [
        { key: "index", label: "#", _style: "width: 10px" },
        { key: "profileName", label: "نام" },
        { key: "userID", label: "نام کاربری" },
        { key: "isDefault", label: "پیشفرض" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "خط مشی",
    };
  },
  methods: {
    moreAction({ profileID: id }) {
      this.$router.push({ name: "showProfile", params: { id } });
    },
    async updateAction({ data, status }) {
      data.isDefault = status;
      const clonedData = { ...data };
      for (const key in clonedData) {
        if (clonedData[key] === "") clonedData[key] = null;
        if (!this.keysToPost.includes(key)) {
          delete clonedData[key];
        }
      }
      try {
        await update({ ...clonedData });
      } catch (ex) {
        console.log(ex);
      }
    },
    editAction({ profileID: id }) {
      this.$router.push({ name: "editProfile", params: { id } });
    },
  },
};
</script>