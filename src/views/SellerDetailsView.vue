<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import SellersService from '@/services/SellersService';
import type { Seller } from '@/types/Seller';
import SalesChart from '@/components/SalesChart.vue';

const props = defineProps<{
  id: string;
}>();

const seller = ref<Seller | null>(null);
const isLoaded = ref(false);

const getSeller = () => {
  SellersService.getSeller(parseInt(props.id))
    .then((response) => {
      seller.value = response.data;
    })
    .catch((error) => {
      console.error('Error fetching sellers:', error);
    })
    .finally(() => {
      isLoaded.value = true;
    });
};

const categorySummary = computed(() => {
  const summary: Record<string, { unitsSold: number; totalRevenue: number }> = {};
  seller.value?.sales.forEach((month) => {
    month.categories.forEach((cat) => {
      if (!summary[cat.category]) {
        summary[cat.category] = { unitsSold: 0, totalRevenue: 0 };
      }
      summary[cat.category].unitsSold += cat.unitsSold;
      summary[cat.category].totalRevenue += cat.totalRevenue;
    });
  });
  // Zwróć jako tablicę (do v-for)
  return Object.entries(summary).map(([category, data]) => ({
    category,
    ...data,
  }));
});

onMounted(() => {
  getSeller();
});
</script>
<template>
  <div
    v-if="seller"
    class="mx-auto flex max-w-lg flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800"
  >
    <div>
      <h2 class="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
        {{ seller.name }}
      </h2>
      <div class="text-sm text-gray-500 dark:text-gray-400">Team: {{ seller.team }}</div>
      <div class="mt-1 text-xs text-gray-400">Hired: {{ seller.hireDate }}</div>
    </div>
    <div class="mt-2 flex flex-col gap-2">
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-300">Total units sold:</span>
        <span class="font-semibold text-gray-900 dark:text-white">{{
          seller.totalUnitsSold
        }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-300">Total revenue:</span>
        <span class="font-semibold text-gray-900 dark:text-white"
          >{{ seller.totalRevenue.toLocaleString() }} PLN</span
        >
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-300">Avg. per month:</span>
        <span class="font-semibold text-gray-900 dark:text-white">{{
          seller.averageUnitsSoldPerMonth
        }}</span>
      </div>
    </div>

    <!-- Dodatkowe podsumowanie: sprzedaż według kategorii -->
    <div v-if="categorySummary.length" class="mt-4">
      <div class="mb-2 font-semibold text-gray-700 dark:text-gray-200">
        Sales by category:
      </div>
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li
          v-for="cat in categorySummary"
          :key="cat.category"
          class="flex items-center justify-between py-1"
        >
          <span class="text-gray-600 dark:text-gray-300">{{ cat.category }}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ cat.unitsSold }} sold, {{ cat.totalRevenue.toLocaleString() }} PLN
          </span>
        </li>
      </ul>
    </div>
    <SalesChart :seller="seller" />
  </div>
</template>
