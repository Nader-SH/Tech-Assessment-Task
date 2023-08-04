import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import SignInView from "../views/SignInView.vue";
import NotFoundView from "../views/NotFoundView.vue";


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
  },
  {
    path: "/signin",
    name: "signin",
    component: SignInView,
  },
  {
    path: "/:catchAll(.*)",
    name: "notfoundview",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
