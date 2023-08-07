import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import SignInView from "../views/SignInView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import BookDetailsView from "../views/BookDetailsView.vue";
import auth from "../auth/auth.js";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
    meta: { requiresAuth: false },
  },
  {
    path: "/signin",
    name: "signin",
    component: SignInView,
    meta: { requiresAuth: false },
  },
  {
    path: "/:catchAll(.*)",
    name: "notfoundview",
    component: NotFoundView,
    meta: { requiresAuth: false },
  },
  {
  path: "/bookdetails/:id",
  name :"bookdetailsview",
  component: BookDetailsView,
  props: true,
  meta: { requiresAuth: true },
},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const data = await auth();
  if (to.meta.requiresAuth === true) {
    if (data.user && data.token) {
      next();
    } else if (data === "Unauthorized") {
      next("/signin");
    }
  } else if (to.meta.requiresAuth === false) {
    if (data.user && data.token) {
      next("/");
    }
    next();
  }
});

export default router;
