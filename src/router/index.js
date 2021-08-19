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
