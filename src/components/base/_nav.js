export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavDropdown",
        name: "کاربران",
        icon: "cil-user",
        items: [
          {
            _name: "CSidebarNavItem",
            name: "کاربران",
            to: "/admin/person/store",
            icon: "cil-user",
          },
        ],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "محصولات",
        icon: "cil-basket",
        items: [
          {
            name: "محصولات",
            to: "/admin/product/store",
            icon: "cil-basket",
          },
          {
            _name: "CSidebarNavItem",
            name: "تنظیمات محصولات",
            to: "/admin/productoption/store",
            icon: "cil-cog",
          },
          {
            _name: "CSidebarNavItem",
            name: "قیمت محصولات",
            to: "/admin/productprice/store",
            icon: "cil-money",
          },
          {
            _name: "CSidebarNavItem",
            name: "عکس محصولات",
            to: "/admin/productimage/store",
            icon: "cil-image",
          },
        ],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "اطلاعات پایه",
        icon: "cil-applications",
        items: [
          {
            _name: "CSidebarNavItem",
            name: "دسته بندی‌ها",
            to: "/admin/category/store",
            icon: "cil-applications",
          },
          {
            _name: "CSidebarNavItem",
            name: "سرورها",
            to: "/admin/server/store",
            icon: "cil-router",
          },
          {
            _name: "CSidebarNavItem",
            name: "انواع تنظیمات",
            to: "/admin/optiontype/store",
            icon: "cil-apps-settings",
          },
          {
            _name: "CSidebarNavItem",
            name: "تنظیمات",
            to: "/admin/option/store",
            icon: "cil-equalizer",
          },
          {
            _name: "CSidebarNavItem",
            name: "اشتراک‌ها",
            to: "/admin/subscription/store",
            icon: "cil-contact",
          },
          {
            _name: "CSidebarNavItem",
            name: "روش‌های پرداخت",
            to: "/admin/paytype/store",
            icon: "cil-credit-card",
          },
        ],
      },
    ],
  },
];
