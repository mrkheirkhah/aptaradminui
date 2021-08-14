import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
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
