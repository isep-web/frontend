import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/homeAdd",
    name: "HomeAdd",
    component: () => import("../views/HomeAdd.vue"),
  },
  {
    path: "/Publishing",
    name: "Publishing",
    component: () => import("../views/Publishing.vue"),
  },
  {
    path: "/homeDetail",
    name: "homeDetail",
    component: () => import("../views/HomeDetail.vue"),
  },
  {
    path: "/application",
    name: "Application",
    component: () => import("../views/Application.vue"),
  },
  {
    path: "/reservation",
    name: "Reservation",
    component: () => import("../views/Reservation.vue"),
  },
  {
    path: "/message",
    name: "Message",
    component: () => import("../views/Message.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/editprofile",
    name: "Editprofile",
    component: () => import("../views/Editprofile.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      showNav: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      showNav: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
