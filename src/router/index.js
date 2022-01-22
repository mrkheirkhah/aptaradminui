import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  mode: "history",
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem(
    process.env.VUE_APP_ENV_APPLICATION_TOKEN_KEY
  );
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else next();
});

export default router;

function configRoutes() {
  return [
    { path: "/", redirect: "/admin/dashboard", name: "main" },
    {
      path: "/admin",
      redirect: "/admin/dashboard",
      name: "admin",
      component: () => import("@/pages/layouts/admin"),
      children: [
        {
          path: "dashboard",
          name: "adminDashboard",
          component: () => import("@/pages/admin/dashboard"),
        },
        {
          path: "change-password",
          name: "changePassword",
          component: () => import("@/pages/admin/ChangePassword.vue"),
        },
        {
          path: "person",
          redirect: "/admin/person/store",
          name: "person",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storePersons",
              component: () => import("@/pages/admin/Person/store"),
            },
            {
              path: "add",
              name: "addPerson",
              component: () => import("@/pages/admin/Person/add"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showPerson",
              component: () => import("@/pages/admin/Person/show"),
            },
            {
              path: "edit/:id",
              name: "editPerson",
              component: () => import("@/pages/admin/Person/edit"),
            },
          ],
        },
        {
          path: "product",
          redirect: "/admin/product/store",
          name: "product",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeProducts",
              component: () => import("@/pages/admin/Product/store"),
            },
            {
              path: "add",
              name: "addProduct",
              component: () => import("@/pages/admin/Product/add"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showProduct",
              component: () => import("@/pages/admin/Product/show"),
            },
            {
              path: "edit/:id",
              name: "editProduct",
              component: () => import("@/pages/admin/Product/edit"),
            },
          ],
        },
        {
          path: "category",
          redirect: "/admin/category/store",
          name: "category",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeCategory",
              component: () => import("@/pages/admin/Category/store"),
            },
            {
              path: "add",
              name: "addCategory",
              component: () => import("@/pages/admin/Category/add"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showCategory",
              component: () => import("@/pages/admin/Category/show"),
            },
            {
              path: "edit/:id",
              name: "editCategory",
              component: () => import("@/pages/admin/Category/edit"),
            },
          ],
        },
        {
          path: "server",
          redirect: "/admin/server/store",
          name: "server",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeServer",
              component: () => import("@/pages/admin/Server/store"),
            },
            {
              path: "add",
              name: "addServer",
              component: () => import("@/pages/admin/Server/add"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showServer",
              component: () => import("@/pages/admin/Server/show"),
            },
            {
              path: "edit/:id",
              name: "editServer",
              component: () => import("@/pages/admin/Server/edit"),
            },
          ],
        },
        {
          path: "optiontype",
          redirect: "/admin/optiontype/store",
          name: "optiontype",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeOptionType",
              component: () => import("@/pages/admin/OptionType/store"),
            },
            {
              path: "add",
              name: "addOptionType",
              component: () => import("@/pages/admin/OptionType/add"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showOptionType",
              component: () => import("@/pages/admin/OptionType/show"),
            },
            {
              path: "edit/:id",
              name: "editOptionType",
              component: () => import("@/pages/admin/OptionType/edit"),
            },
          ],
        },
        {
          path: "option",
          redirect: "/admin/option/store",
          name: "option",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeOption",
              component: () => import("@/pages/admin/Option/store"),
            },
            {
              path: "add",
              name: "addOption",
              component: () => import("@/pages/admin/Option/add"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showOption",
              component: () => import("@/pages/admin/Option/show"),
            },
            {
              path: "edit/:id",
              name: "editOption",
              component: () => import("@/pages/admin/Option/edit"),
            },
          ],
        },
        {
          path: "subscription",
          redirect: "/admin/subscription/store",
          name: "subscription",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeSubscription",
              component: () => import("@/pages/admin/Subscription/store"),
            },
            {
              path: "add",
              name: "addSubscription",
              component: () => import("@/pages/admin/Subscription/add"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showSubscription",
              component: () => import("@/pages/admin/Subscription/show"),
            },
            {
              path: "edit/:id",
              name: "editSubscription",
              component: () => import("@/pages/admin/Subscription/edit"),
            },
          ],
        },
        {
          path: "paytype",
          redirect: "/admin/paytype/store",
          name: "paytype",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storePayType",
              component: () => import("@/pages/admin/PayType/store"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showPayType",
              component: () => import("@/pages/admin/PayType/show"),
            },
            {
              path: "edit/:id",
              name: "editPayType",
              component: () => import("@/pages/admin/PayType/edit"),
            },
          ],
        },
        {
          path: "productoption",
          redirect: "/admin/productoption/store",
          name: "productoption",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeProductOption",
              component: () => import("@/pages/admin/Product/Option/store"),
            },
            {
              path: "add",
              name: "addProductOption",
              component: () => import("@/pages/admin/Product/Option/add"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showProductOption",
              component: () => import("@/pages/admin/Product/Option/show"),
            },
            {
              path: "edit/:id",
              name: "editProductOption",
              component: () => import("@/pages/admin/Product/Option/edit"),
            },
          ],
        },
        {
          path: "productprice",
          redirect: "/admin/productprice/store",
          name: "productprice",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeProductPrice",
              component: () => import("@/pages/admin/Product/Price/store"),
            },
            {
              path: "add",
              name: "addProductPrice",
              component: () => import("@/pages/admin/Product/Price/add"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showProductPrice",
              component: () => import("@/pages/admin/Product/Price/show"),
            },
            {
              path: "edit/:id",
              name: "editProductPrice",
              component: () => import("@/pages/admin/Product/Price/edit"),
            },
          ],
        },
        {
          path: "productimage",
          redirect: "/admin/productimage/store",
          name: "productImage",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeProductImage",
              component: () => import("@/pages/admin/Product/Image/store"),
            },
            {
              path: "add",
              name: "addProductImage",
              component: () => import("@/pages/admin/Product/Image/add"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showProductImage",
              component: () => import("@/pages/admin/Product/Image/show"),
            },
          ],
        },
        {
          path: "storage",
          redirect: "/admin/storage/store",
          name: "storage",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeStorage",
              component: () => import("@/pages/admin/Storage/store"),
            },
            {
              path: "add",
              name: "addStorage",
              component: () => import("@/pages/admin/Storage/add"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showStorage",
              component: () => import("@/pages/admin/Storage/show"),
            },
            {
              path: "edit/:id",
              name: "editStorage",
              component: () => import("@/pages/admin/Storage/edit"),
            },
          ],
        },
        {
          path: "order",
          redirect: "/admin/order/store",
          name: "order",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeOrder",
              component: () => import("@/pages/admin/Order/store"),
            },
            {
              path: "add",
              name: "addOrder",
              component: () => import("@/pages/admin/Order/add"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showOrder",
              component: () => import("@/pages/admin/Order/show"),
            },
            {
              path: "edit/:id",
              name: "editOrder",
              component: () => import("@/pages/admin/Order/edit"),
            },
          ],
        },
        {
          path: "profile",
          redirect: "/admin/profile/store",
          name: "profile",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeProfile",
              component: () => import("@/pages/admin/Profile/store"),
            },
            {
              path: "add",
              name: "addProfile",
              component: () => import("@/pages/admin/Profile/add"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showProfile",
              component: () => import("@/pages/admin/Profile/show"),
            },
            {
              path: "edit/:id",
              name: "editProfile",
              component: () => import("@/pages/admin/Profile/edit"),
            },
          ],
        },
        {
          path: "profilePerson",
          redirect: "/admin/profileperson/store",
          name: "profilePerson",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeProfilePerson",
              component: () => import("@/pages/admin/Profile/Person/store"),
            },
            {
              path: "show/:id(\\d+)",
              name: "showProfilePerson",
              component: () => import("@/pages/admin/Profile/Person/show"),
            },
            {
              path: "edit/:id",
              name: "editProfilePerson",
              component: () => import("@/pages/admin/Profile/Person/edit"),
            },
          ],
        },
        {
          path: "ticket",
          redirect: "/admin/ticket/store",
          name: "ticket",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "store",
              name: "storeTicket",
              component: () => import("@/pages/admin/Ticket/store"),
            },
            {
              path: "edit/:id",
              name: "editTicket",
              component: () => import("@/pages/admin/Ticket/edit"),
            },
          ],
        },
        {
          path: "/admin/Invoice/:id",
          name: "invoice",
          component: () => import("@/pages/admin/Invoice"),
        },
      ],
    },
    {
      path: "/500",
      name: "Page500",
      component: () => import("@/pages/Page500"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/pages/Login"),
    },
    {
      path: "*",
      name: "Page404",
      component: () => import("@/pages/Page404"),
    },
  ];
}
