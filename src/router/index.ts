import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SellersListView from '@/views/SellersListView.vue';
import SellerDetailsView from '@/views/SellerDetailsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sellers',
      props: (route) => ({
        page: parseInt(route.query.page as string) || 1,
      }),
      name: 'sellers-list',
      component: SellersListView,
    },
    {
      path: '/sellers/:id',
      name: 'sellers-details',
      props: true,
      component: SellerDetailsView,
    },
  ],
});

export default router;
