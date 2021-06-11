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
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/adminHouse",
    name: "AdminHouse",
    component: () => import("../views/AdminHouse.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login" || to.path === "/register") {
    //若要跳转的页面是登录界面
    next(); //直接跳转
  } else {
    //若要跳转的页面是个人界面//获取本地存储的token值
    const token = localStorage.getItem("token");
    if (token === null || token === "") {
      //若token为空则验证不成功，跳转到登录页面
      alert("Please login first");
      next("/login");
    } else {
      //不为空则验证成功
      next();
    }
  }
});

export default router;
