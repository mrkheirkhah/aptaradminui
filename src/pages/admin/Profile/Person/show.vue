<template>
  <div>
    <ShowGroupedDataCard
      :title="data.profileName"
      icon="cil-applications"
      store-link="/admin/profileperson/"
      store-name="همه خطی مشی‌ کاربران"
      :fieldsToShow="fieldsToShow"
    />
  </div>
</template>

<script>
import { getOne } from "../../../../services/Profile/person";
import showPageMixin from "../../../../mixins/showPage";
import ShowGroupedDataCard from "../../../../components/base/ShowGroupedDataCard.vue";
import { properStatus } from "../../../../utils";
export default {
  mixins: [showPageMixin],
  components: { ShowGroupedDataCard },
  data() {
    return {
      properStatus,
      fetchInfoMethod: getOne,
      data: {
        isDefault: false,
        profileName: "",
        autoRemote: "",
        colorDepthID: "",
        cachePersistenceActive: "",
        enableAutoReconnect: "",
        maxReconnectAttempts: "",
        redirectDrives: "",
        redirectPrinters: "",
        redirectClipboard: "",
        redirectSmartCards: "",
        redirectPorts: "",
        redirectDevices: "",
        redirectPOSDevices: "",
        audioRedirectionMode: "",
        disablE_CURSOR_SHADOW: "",
        disablE_CURSORSETTINGS: "",
        disablE_FULLWINDOWDRAG: "",
        disablE_MENUANIMATIONS: "",
        disablE_THEMING: "",
        disablE_WALLPAPER: "",
        enablE_DESKTOP_COMPOSITION: "",
        enablE_ENHANCED_GRAPHICS: "",
        enablE_FONT_SMOOTHING: "",
        softwareRunNumber: "",
        softwareRunLength: "",
        softwareRunTimeFrom: "",
        softwareRunTimeTo: "",
        softwareRunSaturday: "",
        softwareRunSunday: "",
        softwareRunMonday: "",
        softwareRunTuesday: "",
        softwareRunWednesday: "",
        softwareRunThursday: "",
        softwareRunFriday: "",
        disableDrives: "",
        restrictDrives: "",
        disableCMD: "",
        disableRegistry: "",
        disableGPEdit: "",
        disableMapDrive: "",
        disableShare: "",
        disableTaskManager: "",
        disableControlPanel: "",
        webServer: "",
        accessDesktop: "",
        disableFolderOption: "",
        disableShutdwon: "",
        webRedirectDrive: "",
        webRedirectPrinter: "",
        webColorDepthID: "",
        webAudio: "",
        webScreenWidth: "",
        webScreenHeight: "",
        autoLogOffTime: "",
        quotaLimitSize: "",
        cpuCoreNumber: "",
        enableProcessWatcher: "",
        showUserProfile: "",
        ipFrom: "",
        ipTo: "",
        storageID: "",
        enableNetworkDiscovery: "",
        limitTypeID: "",
        downloadTrafficLimit: "",
        uploadTrafficLimit: "",
        downloadUploadTrafficLimit: "",
        personID: 0,
      },
    };
  },
  computed: {
    storagesObjectMappedById() {
      const statesObject = {};
      this.$store.state.storagesArray.map((stateObj) => {
        statesObject[stateObj.id] = stateObj.title;
      });
      return statesObject;
    },
    limitTypesObjectMappedById() {
      const statesObject = {};
      this.$store.state.limitTypesArray.map((stateObj) => {
        statesObject[stateObj.id] = stateObj.title;
      });
      return statesObject;
    },
    colorDepthsObjectMappedById() {
      const statesObject = {};
      this.$store.state.colorDepthsArray.map((stateObj) => {
        statesObject[stateObj.id] = stateObj.title;
      });
      return statesObject;
    },
    personsObjectMappedById() {
      const statesObject = {};
      this.$store.state.personsArray.map((stateObj) => {
        statesObject[stateObj.id] = stateObj.title;
      });
      return statesObject;
    },
    fieldsToShow() {
      const self = this;
      return [
        {
          headerName: "تنظیمات خط مشی",
          col: "12",
          children: [
            {
              name: "profileName",
              data: self.data.profileName,
              type: "text",
              persianName: "عنوان خط مشی",
              col: "6",
              isRequired: true,
              validationFunction: (val) => val && val !== "",
              invalidFeedback: "عنوان خط مشی را وارد کنید",
            },
            {
              name: "personID",
              data: self.personsObjectMappedById[self.data.personID],
              type: "option",
              persianName: "کاربر",
              options: self.personsArr,
              col: "6",
              isRequired: true,
              validationFunction: (val) => val,
              invalidFeedback: "کاربر را انتخاب کنید",
            },
            {
              name: "isDefault",
              data: self.data.isDefault,
              type: "switch",
              persianName: "پیشفرض",
              col: "6",
            },
          ],
        },
        {
          headerName: "نمایش",
          col: "12",
          children: [
            {
              name: "colorDepthID",
              data: self.colorDepthsObjectMappedById[self.data.colorDepthID],
              type: "option",
              persianName: "عمق رنگ",
              defaultVal: 16,
              col: "6",
              isRequired: false,
              validationFunction: (val) => !val || val,
              invalidFeedback: "عمق رنگ را انتخاب کنید",
            },
            {
              name: "cachePersistenceActive",
              data: self.data.cachePersistenceActive,
              type: "checkbox",
              persianName: "نهان ساز",
              defaultVal: 1,
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "نهان ساز را مشخص کنید",
            },
          ],
        },
        {
          headerName: "دسترسی سخت‌افزار",
          col: "12",
          children: [
            {
              name: "audioRedirectionMode",
              data: self.data.audioRedirectionMode,
              type: "checkbox",
              persianName: "صدا",
              defaultVal: 1,
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "صدا را مشخص کنید",
            },
            {
              name: "redirectClipboard",
              data: self.data.redirectClipboard,
              type: "checkbox",
              persianName: "کلیپ برد",
              defaultVal: 1,
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "کلیپ برد را مشخص کنید",
            },
            {
              name: "redirectDevices",
              data: self.data.redirectDevices,
              type: "checkbox",
              persianName: "ابزار های متصل",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "ابزار های متصل را مشخص کنید",
            },
            {
              name: "redirectSmartCards",
              data: self.data.redirectSmartCards,
              type: "checkbox",
              persianName: "کارت های هوشمند",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "کارت های هوشمند را مشخص کنید",
            },
            {
              name: "redirectPorts",
              data: self.data.redirectPorts,
              type: "checkbox",
              persianName: "پورت های سریال",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "پورت های سریال را مشخص کنید",
            },
            {
              name: "redirectPOSDevices",
              data: self.data.redirectPOSDevices,
              type: "checkbox",
              persianName: "دستگاه های متصل همراه",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "دستگاه های متصل همراه را مشخص کنید",
            },
            {
              name: "redirectDrives",
              data: self.data.redirectDrives,
              type: "checkbox",
              persianName: "درایو‌ها",
              defaultVal: 1,
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "درایو‌ها را مشخص کنید",
            },
            {
              name: "redirectPrinters",
              data: self.data.redirectPrinters,
              type: "checkbox",
              persianName: "پرینتر محلی",
              defaultVal: 1,
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "پرینتر محلی را مشخص کنید",
            },
          ],
        },
        {
          headerName: "زمان",
          col: "12",
          children: [
            {
              name: "softwareRunSaturday",
              data: self.data.softwareRunSaturday,
              type: "checkbox",
              defaultVal: 1,
              persianName: "اجرا برنامه در روز شنبه",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "اجرا برنامه در روز شنبه را مشخص کنید",
            },
            {
              name: "softwareRunSunday",
              defaultVal: 1,
              data: self.data.softwareRunSunday,
              type: "checkbox",
              persianName: "اجرا برنامه در روز یکشنبه",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "اجرا برنامه در روز یکشنبه را مشخص کنید",
            },
            {
              name: "softwareRunMonday",
              data: self.data.softwareRunMonday,
              type: "checkbox",
              persianName: "اجرا برنامه در روز دوشنبه",
              defaultVal: 1,
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "اجرا برنامه در روز دوشنبه را مشخص کنید",
            },
            {
              name: "softwareRunTuesday",
              defaultVal: 1,
              data: self.data.softwareRunTuesday,
              type: "checkbox",
              persianName: "اجرا برنامه در روز سه‌شنبه",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "اجرا برنامه در روز سه‌شنبه را مشخص کنید",
            },
            {
              name: "softwareRunWednesday",
              data: self.data.softwareRunWednesday,
              type: "checkbox",
              defaultVal: 1,
              persianName: "اجرا برنامه در روز چهارشنبه",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "اجرا برنامه در روز چهارشنبه را مشخص کنید",
            },
            {
              name: "softwareRunThursday",
              data: self.data.softwareRunThursday,
              type: "checkbox",
              defaultVal: 1,
              persianName: "اجرا برنامه در روز پنج‌شنبه",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "اجرا برنامه در روز پنج‌شنبه را مشخص کنید",
            },
            {
              name: "softwareRunFriday",
              data: self.data.softwareRunFriday,
              type: "checkbox",
              defaultVal: 1,
              persianName: "اجرا برنامه در روز جمعه",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "اجرا برنامه در روز پنج‌شنبه را مشخص کنید",
            },
            {
              name: "softwareRunNumber",
              data: self.data.softwareRunNumber,
              type: "number",
              persianName: "دفعات اجرا",
              placeholder: "عدد 0 بیانگر تعداد نامحدود",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "دفعات اجرا را مشخص کنید",
            },
            {
              name: "softwareRunLength",
              data: self.data.softwareRunLength,
              type: "number",
              persianName: "مدت اجرای برنامه",
              placeholder: "عدد 0 بیانگر تعداد نامحدود",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "مدت اجرای برنامه را مشخص کنید",
            },
            {
              name: "softwareRunTimeFrom",
              data: self.data.softwareRunTimeFrom,
              type: "number",
              persianName: "محدوده زمانی اجرا از",
              placeholder: "مانند 0730",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "محدوده زمانی اجرا از را مشخص کنید",
            },
            {
              name: "softwareRunTimeTo",
              data: self.data.softwareRunTimeTo,
              type: "number",
              persianName: "محدوده زمانی اجرا تا",
              placeholder: "مانند 1430",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "محدوده زمانی اجرا تا را مشخص کنید",
            },
            {
              name: "autoLogOffTime",
              data: self.data.autoLogOffTime,
              type: "number",
              placeholder: "دقیقه",
              persianName: "زمان لاگ آف کاربر",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "زمان لاگ آف کاربر را مشخص کنید",
            },
          ],
        },
        {
          headerName: "دسترسی‌ها",
          col: "12",
          children: [
            {
              name: "disableDrives",
              data: self.data.disableDrives,
              type: "checkbox",
              persianName: "مخفی شدن درایوها",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "مخفی شدن درایوها را مشخص کنید",
            },
            {
              name: "disableMapDrive",
              data: self.data.disableMapDrive,
              type: "checkbox",
              persianName: "غیرفعال شدن درایو شبکه",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "غیرفعال شدن درایو شبکه را مشخص کنید",
            },
            {
              name: "restrictDrives",
              data: self.data.restrictDrives,
              type: "checkbox",
              persianName: "عدم دسترسی درایوها",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "عدم دسترسی درایوها را مشخص کنید",
            },
            {
              name: "disableRegistry",
              data: self.data.disableRegistry,
              type: "checkbox",
              persianName: "غیرفعال شدن Registery",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "غیرفعال شدن Registery را مشخص کنید",
            },
            {
              name: "disableGPEdit",
              data: self.data.disableGPEdit,
              type: "checkbox",
              persianName: "غیرفعال شدن GEEdit",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "غیرفعال شدن GEEdit را مشخص کنید",
            },
            {
              name: "disableTaskManager",
              data: self.data.disableTaskManager,
              type: "checkbox",
              persianName: "غیرفعال شدن TaskManager",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "غیرفعال شدن TaskManager را مشخص کنید",
            },
            {
              name: "disableControlPanel",
              data: self.data.disableControlPanel,
              type: "checkbox",
              persianName: "غیرفعال شدن ControlPanel",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "غیرفعال شدن ControlPanel را مشخص کنید",
            },
            {
              name: "disableCMD",
              data: self.data.disableCMD,
              type: "checkbox",
              persianName: "غیرفعال شدن CMD",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "غیرفعال شدن GEEdit را مشخص کنید",
            },
            {
              name: "disableFolderOption",
              data: self.data.disableFolderOption,
              type: "checkbox",
              defaultVal: 1,
              persianName: "غیرفعال شدن Folder Option",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "غیرفعال شدن Folder Option را مشخص کنید",
            },
            {
              name: "disableShare",
              data: self.data.disableShare,
              type: "checkbox",
              persianName: "غیرفعال بودن اشتراک",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "غیرفعال بودن اشتراک را مشخص کنید",
            },
            {
              name: "showUserProfile",
              data: self.data.showUserProfile,
              type: "checkbox",
              persianName: "مخفی نشدن پروفایل کاربر",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "مخفی نشدن پروفایل کاربر را مشخص کنید",
            },
            {
              name: "enableProcessWatcher",
              data: self.data.enableProcessWatcher,
              type: "checkbox",
              persianName: "بستن برنامه های غیر مجاز",
              defaultVal: 1,
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "بستن برنامه های غیر مجاز را مشخص کنید",
            },
            {
              name: "enableNetworkDiscovery",
              data: self.data.enableNetworkDiscovery,
              type: "checkbox",
              persianName: "فعال شدن Network Discovery",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "فعال شدن Network Discovery را مشخص کنید",
            },
            {
              name: "accessDesktop",
              data: self.data.accessDesktop,
              type: "checkbox",
              persianName: "دسترسی دسکتاپ",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "دسترسی دسکتاپ را مشخص کنید",
            },
            {
              name: "cpuCoreNumber",
              data: self.data.cpuCoreNumber,
              type: "number",
              persianName: "تعداد هسته CPU مجاز",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "تعداد هسته CPU مجاز را مشخص کنید",
            },
            {
              name: "storageID",
              data: self.storagesObjectMappedById[self.data.storageID],
              type: "option",
              persianName: "فضای ذخیره سازی",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "فضای ذخیره سازی را مشخص کنید",
            },
            {
              name: "quotaLimitSize",
              data: self.data.quotaLimitSize,
              type: "number",
              persianName: "میزان فضای مجاز کاربر(MB)",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "میزان فضای مجاز کاربر(MB) را مشخص کنید",
            },
            {
              name: "ipFrom",
              data: self.data.ipFrom,
              type: "text",
              persianName: "دسترسی IP از",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "دسترسی IP از را مشخص کنید",
            },
            {
              name: "ipTo",
              data: self.data.ipTo,
              type: "text",
              persianName: "دسترسی IP تا",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "دسترسی IP تا را مشخص کنید",
            },
          ],
        },
        {
          headerName: "دسترسی‌ وب",
          col: "12",
          children: [
            {
              name: "webServer",
              data: self.data.webServer,
              type: "checkbox",
              persianName: "دسترسی از طریق وب",
              defaultVal: 1,
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "دسترسی از طریق وب را مشخص کنید",
            },

            {
              name: "webRedirectDrive",
              data: self.data.webRedirectDrive,
              type: "checkbox",
              persianName: "قابلیت انتقال فایل",
              col: "6",
              validationFunction: (val) => !val || (val && val !== ""),
              invalidFeedback: "قابلیت انتقال فایل را مشخص کنید",
            },
            {
              name: "webRedirectPrinter",
              data: self.data.webRedirectPrinter,
              type: "checkbox",
              persianName: "نمایش پرینتر",
              col: "6",
              validationFunction: (val) => !val || (val && val !== ""),
              invalidFeedback: "نمایش پرینتر را مشخص کنید",
            },

            {
              name: "webScreenWidth",
              data: self.data.webScreenWidth,
              type: "checkbox",
              persianName: "غیرفعال بودن عرض صفحه",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "عرض صفحه را مشخص کنید",
            },
            {
              name: "webScreenHeight",
              data: self.data.webScreenHeight,
              type: "checkbox",
              persianName: "غیرفعال بودن طول صفحه",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "طول صفحه را مشخص کنید",
            },
            {
              name: "webAudio",
              data: self.data.webAudio,
              type: "checkbox",
              persianName: "فعال بودن صدا",
              col: "6",
              validationFunction: (val) => !val || (val && val !== ""),
              invalidFeedback: "فعال بودن صدا را مشخص کنید",
            },
            {
              name: "webColorDepthID",
              data: self.colorDepthsObjectMappedById[self.data.webColorDepthID],
              type: "option",
              persianName: "عمق رنگ وب",
              defaultVal: 16,
              col: "6",
              validationFunction: (val) => !val || val,
              invalidFeedback: "عمق رنگ وب را مشخص کنید",
            },
          ],
        },
        {
          headerName: "اینترنت",
          col: "12",
          children: [
            {
              name: "limitTypeID",
              data: self.limitTypesObjectMappedById[self.data.limitTypeID],
              type: "option",
              persianName: "نوع محدودیت حجمی",
              defaultVal: 1,
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "نوع محدودیت حجمی را مشخص کنید",
            },
            {
              name: "downloadTrafficLimit",
              data: self.data.downloadTrafficLimit,
              type: "number",
              persianName: "محدودیت دانلود",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "محدودیت دانلود را مشخص کنید",
            },
            {
              name: "uploadTrafficLimit",
              data: self.data.uploadTrafficLimit,
              type: "number",
              persianName: "محدودیت آپلود",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "محدودیت آپلود را مشخص کنید",
            },
            {
              name: "downloadUploadTrafficLimit",
              data: self.data.downloadUploadTrafficLimit,
              type: "number",
              persianName: "مجموع محدودیت",
              col: "6",
              validationFunction: (val) => !val || (val && !Number.isNaN(val)),
              invalidFeedback: "مجموع محدودیت را مشخص کنید",
            },
          ],
        },
      ];
    },
  },
};
</script>