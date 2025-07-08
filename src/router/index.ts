import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SellersListView from '@/views/SellersListView.vue';
import SellerDetailsView from '@/views/SellerDetailsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

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
      name: 'sellers-list',
      component: SellersListView,
    },
    {
      path: '/sellers/:id',
      name: 'sellers-details',
      props: true,
      component: SellerDetailsView,
    },
    //errors
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
