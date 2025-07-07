<script setup lang="ts">
import type { Seller } from '@/types/Seller';
import { ref, onMounted } from 'vue';
import SellersService from '@/services/SellersService';
import SellerCard from '@/components/SellersList/SellerCard.vue';

const sellers = ref<Seller[]>([]);
const isLoaded = ref(false);

const perPage = 3;
const page = 1;

const getSellers = () => {
  SellersService.getSellers(perPage, page)
    .then((response) => {
      sellers.value = response.data;
    })
    .catch((error) => {
      console.error('Error fetching sellers:', error);
    })
    .finally(() => {
      isLoaded.value = true;
    });
};

onMounted(() => {
  getSellers();
});
</script>

<template>
  <div>
    <h1 class="mb-4 text-2xl font-bold">Sellers List</h1>
    <div v-if="!isLoaded" class="text-center">Loading...</div>
    <template v-else>
      <ul class="space-y-4">
        <li v-for="seller in sellers" :key="seller.id">
          <SellerCard :seller class="cursor-pointer hover:bg-white/20" />
        </li>
      </ul>
      <div v-if="sellers.length === 0" class="mt-4 text-center">No sellers found.</div>
    </template>
  </div>
</template>
