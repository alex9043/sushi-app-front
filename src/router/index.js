import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AuthView from '@/views/AuthView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/auth',
    name: 'AuthView',
    component: AuthView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
