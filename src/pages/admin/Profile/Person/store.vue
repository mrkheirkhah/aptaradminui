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
            @page-change="pageChange"
            @pagination-change="paginationChange"
            @sorter-change="sorterChange"
            @column-filter-change="columnFilterChange"
            @more-action="moreAction"
            @toggle-data-state="updateAction"
            @edit-action="editAction"
            :showDelete="false"
          />
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>

<script>
import ProfileTableWrapper from "@/components/TableWrappers/ProfileTableWrapper.vue";
import { update, getAll, remove } from "../../../../services/Profile/person";
import storePageMixin from "../../../../mixins/storePage";
export default {
  components: { ProfileTableWrapper },
  mixins: [storePageMixin],
  data() {
    return {
      fetchAll: getAll,
      deleteInfoMethod: remove,
      deleteIdField: "profilePersonID",
      categoryUpdateActions: ["fetchprofiles"],
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
        { key: "profileID", label: "نام" },
        { key: "personID", label: "نام کاربری" },
        { key: "actions", label: "عملیات" },
      ],
      gridTitle: "خط مشی کاربران",
    };
  },
  methods: {
    moreAction({ profilePersonID: id }) {
      this.$router.push({ name: "showProfilePerson", params: { id } });
    },
    async updateAction({ data, status }) {
      data.isActive = status;
      const clonedData = { ...data };
      for (const key in clonedData) {
        if (clonedData[key] === "") clonedData[key] = null;
        if (!this.keysToPost.includes(key)) {
          delete clonedData[key];
        }
      }
      try {
        await update({ ...clonedData });
        this.updateCategoriesIfHave();
      } catch (ex) {
        console.log(ex);
      }
    },
    editAction({ profilePersonID: id }) {
      this.$router.push({ name: "editProfilePerson", params: { id } });
    },
  },
};
</script>
