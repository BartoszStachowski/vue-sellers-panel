<script setup lang="ts">
import { onMounted, computed } from 'vue';
import SalesChart from '@/components/SellersList/SalesChart.vue';
import { useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import AppLoader from '@/components/base/AppLoader.vue';
import { useSellersStore } from '@/stores/sellers';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  id: string;
}>();

const router = useRouter();

const sellersStore = useSellersStore();
const { getSeller } = sellersStore;
const { seller, isLoaded } = storeToRefs(sellersStore);

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
  return Object.entries(summary).map(([category, data]) => ({
    category,
    ...data,
  }));
});

const back = () => {
  router.push({ name: 'sellers-list' });
};

onMounted(() => {
  getSeller(parseInt(props.id));
});
</script>
<template>
  <div v-if="!isLoaded" class="flex h-[90vh] items-center justify-center text-center">
    <AppLoader />
  </div>
  <div
    v-if="seller"
    class="mx-auto flex max-w-lg flex-col gap-4 rounded-2xl bg-gray-800 p-6 shadow-lg"
  >
    <div>
      <button class="mb-2 flex cursor-pointer gap-1 hover:text-gray-200" @click="back">
        <ArrowLeft /> Back
      </button>
      <h2 class="mb-1 text-2xl font-bold text-white">
        {{ seller.name }}
      </h2>
      <div class="text-sm text-gray-400">Team: {{ seller.team }}</div>
      <div class="mt-1 text-xs text-gray-400">Hired: {{ seller.hireDate }}</div>
    </div>
    <div class="mt-2 flex flex-col gap-2">
      <div class="flex justify-between">
        <span class="text-gray-300">Total units sold:</span>
        <span class="font-semibold text-white">{{ seller.totalUnitsSold }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-300">Total revenue:</span>
        <span class="font-semibold text-white"
          >{{ seller.totalRevenue.toLocaleString() }} PLN</span
        >
      </div>
      <div class="flex justify-between">
        <span class="text-gray-300">Avg. per month:</span>
        <span class="font-semibold text-white">{{
          seller.averageUnitsSoldPerMonth
        }}</span>
      </div>
    </div>

    <!-- Dodatkowe podsumowanie: sprzedaż według kategorii -->
    <div v-if="categorySummary.length" class="mt-4">
      <div class="mb-2 font-semibold text-gray-200">Sales by category:</div>
      <ul class="divide-y divide-gray-700">
        <li
          v-for="cat in categorySummary"
          :key="cat.category"
          class="flex items-center justify-between py-1"
        >
          <span class="text-gray-300">{{ cat.category }}</span>
          <span class="text-sm text-gray-400">
            {{ cat.unitsSold }} sold, {{ cat.totalRevenue.toLocaleString() }} PLN
          </span>
        </li>
      </ul>
    </div>
    <SalesChart :seller="seller" />
  </div>
</template>
