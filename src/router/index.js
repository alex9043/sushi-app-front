import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AuthView from '@/views/AuthView.vue';
import OrderView from '@/views/OrderView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
  },
  {
    path: '/order',
    name: 'Order',
    component: OrderView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
