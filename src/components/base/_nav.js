export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavItem",
        name: "کاربران",
        to: "/admin/person/store",
        icon: "cil-user",
      },
      {
        _name: "CSidebarNavItem",
        name: "محصولات",
        to: "/admin/product/store",
        icon: "cil-basket",
      },
    ],
  },
];
