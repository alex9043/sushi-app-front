import { createRouter, createWebHashHistory } from "vue-router";
import RegisterComponent from "../components/RegisterComponent.vue";

const routes = [
  {
    path: "/register",
    name: "Register",
    component: RegisterComponent,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
