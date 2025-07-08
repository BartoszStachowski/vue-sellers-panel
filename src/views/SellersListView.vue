<script setup lang="ts">
import type { Seller } from '@/types/Seller';
import { ref, onMounted, watch, computed } from 'vue';
import SellersService from '@/services/SellersService';
import SellerCard from '@/components/SellersList/SellerCard.vue';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import AppLoader from '@/components/AppLoader.vue';

const props = defineProps<{
  page: number;
}>();

const router = useRouter();

const sellers = ref<Seller[]>([]);
const isLoaded = ref(false);
const totalSellers = ref(0);

const itemsPerPage = 3;

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalSellers.value / itemsPerPage);
  return props.page < totalPages;
});

const getSellers = (perPage: number, page: number) => {
  SellersService.getSellers(perPage, page)
    .then((response) => {
      sellers.value = response.data;
      totalSellers.value = response.headers['x-total-count'];
    })
    .catch((error) => {
      console.error('Error fetching sellers:', error);
    })
    .finally(() => {
      isLoaded.value = true;
    });
};

onMounted(() => {
  getSellers(3, 1);
});

watch(
  () => props.page,
  () => {
    sellers.value = [];
    getSellers(itemsPerPage, props.page);
  },
);
</script>

<template>
  <div>
    <h1 class="mb-4 text-2xl font-bold">Sellers List</h1>
    <div v-if="!isLoaded" class="text-center">
      <AppLoader />
    </div>
    <template v-else>
      <ul class="space-y-4">
        <li v-for="seller in sellers" :key="seller.id">
          <SellerCard :seller class="cursor-pointer hover:bg-white/20" />
        </li>
      </ul>
      <div v-if="sellers.length > 0" class="mx-auto mt-4 flex w-64">
        <router-link
          id="page-prev text-left"
          class="flex-1"
          :to="{ name: 'sellers-list', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
        >
          &#60; Prev Page
        </router-link>

        <router-link
          v-if="hasNextPage"
          id="page-next"
          class="flex-1 text-right"
          :to="{ name: 'sellers-list', query: { page: page + 1 } }"
          rel="next"
        >
          Next Page &#62;
        </router-link>
      </div>
      <div v-if="sellers.length === 0" class="mt-4 text-center">No sellers found.</div>
    </template>
  </div>
</template>
