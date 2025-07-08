<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Seller } from '@/types/Seller';
import { computed } from 'vue';

const props = defineProps<{ seller: Seller }>();

const formatTotalRevenue = computed(() => {
  return `${props.seller.totalRevenue.toLocaleString()} PLN`;
});
</script>

<template>
  <div class="gap-4 rounded-2xl bg-gray-800 p-6 shadow-lg">
    <RouterLink :to="{ name: 'sellers-details', params: { id: seller.id } }">
      <h2 data-testid="seller-name" class="mb-1 text-2xl font-bold text-white">
        {{ seller.name }}
      </h2>
      <div data-testid="seller-team" class="text-sm text-gray-400">
        Team: {{ seller.team }}
      </div>
      <div data-testid="seller-hireDate" class="mt-1 text-xs text-gray-400">
        Hired: {{ seller.hireDate }}
      </div>
      <div class="mt-2 flex flex-col gap-2">
        <div class="flex justify-between">
          <span class="text-gray-300">Total units sold:</span>
          <span data-testid="seller-totalUnitsSold" class="font-semibold text-white">
            {{ seller.totalUnitsSold }}
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-300">Total revenue:</span>
          <span class="font-semibold text-white"> {{ formatTotalRevenue }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-300">Average sold per month:</span>
          <span
            data-testid="seller-averageUnitsSoldPerMonth"
            class="font-semibold text-white"
          >
            {{ seller.averageUnitsSoldPerMonth }}
          </span>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
