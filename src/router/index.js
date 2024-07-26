import { createRouter, createWebHashHistory } from "vue-router";
import HomeComponent from "@/components/HomeComponent.vue";
import RegisterComponent from "../components/RegisterComponent.vue";
import AuthorizationComponent from "@/components/AuthorizationComponent.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeComponent,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterComponent,
  },
  {
    path: "/auth",
    name: "Authroization",
    component: AuthorizationComponent,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
