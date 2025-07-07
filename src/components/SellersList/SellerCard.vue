<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Seller } from '@/types/Seller';

defineProps<{ seller: Seller }>();
</script>

<template>
  <div
    class="mx-auto flex max-w-lg flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800"
  >
    <RouterLink :to="{ name: 'sellers-details', params: { id: seller.id } }">
      <div>
        <h2 class="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
          {{ seller.name }}
        </h2>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Team: {{ seller.team }}
        </div>
        <div class="mt-1 text-xs text-gray-400">Hired: {{ seller.hireDate }}</div>
      </div>
      <div class="mt-2 flex flex-col gap-2">
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-300">Total units sold:</span>
          <span class="font-semibold text-gray-900 dark:text-white">
            {{ seller.totalUnitsSold }}
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-300">Total revenue:</span>
          <span class="font-semibold text-gray-900 dark:text-white">
            {{ seller.totalRevenue.toLocaleString() }} PLN</span
          >
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-300">Average sold per month:</span>
          <span class="font-semibold text-gray-900 dark:text-white">
            {{ seller.averageUnitsSoldPerMonth }}</span
          >
        </div>
      </div>
    </RouterLink>
  </div>
</template>
