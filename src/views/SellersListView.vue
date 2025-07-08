<script setup lang="ts">
import type { Seller } from '@/types/Seller';
import { ref, onMounted, watch, computed } from 'vue';
import SellerCard from '@/components/SellersList/SellerCard.vue';
import AppLoader from '@/components/base/AppLoader.vue';
import { useDebounce } from '@/composables/useDebounce';
import SortDropdown from '@/components/base/SortDropdown.vue';
import type { SortOrder } from '@/types/SortOrder';
import { useSellersStore } from '@/stores/sellers';
import { storeToRefs } from 'pinia';
import AppPagination from '@/components/base/AppPagination.vue';
import RangeFilter from '@/components/base/RangeFilter.vue';

const sellersStore = useSellersStore();
const { getSellers } = sellersStore;
const { sellers, isLoaded } = storeToRefs(sellersStore);

const sortOrder = ref<SortOrder>('default');
const currentPage = ref(1);
const itemsPerPage = 3;

const search = ref('');
const debouncedSearch = useDebounce(search, 400);

const minUnits = ref<number | null>(null);
const maxUnits = ref<number | null>(null);

const filteredSellers = computed<Seller[]>(() => {
  const query = debouncedSearch.value.toLowerCase();
  let filtered = sellers.value.filter((seller) =>
    seller.name.toLowerCase().includes(query),
  );

  const sellersFromRangeFilter = handleRangeFilter(filtered);
  if (sellersFromRangeFilter) {
    filtered = sellersFromRangeFilter;
  }

  if (sortOrder.value === 'name-asc') {
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder.value === 'name-desc') {
    return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOrder.value === 'totalRevenue-asc') {
    return [...filtered].sort((a, b) => {
      const popA = isNaN(Number(a.totalRevenue))
        ? Number.MAX_SAFE_INTEGER
        : Number(a.totalRevenue);
      const popB = isNaN(Number(b.totalRevenue))
        ? Number.MAX_SAFE_INTEGER
        : Number(b.totalRevenue);
      return popA - popB;
    });
  } else if (sortOrder.value === 'totalRevenue-desc') {
    return [...filtered].sort((a, b) => {
      const popA = isNaN(Number(a.totalRevenue)) ? -1 : Number(a.totalRevenue);
      const popB = isNaN(Number(b.totalRevenue)) ? -1 : Number(b.totalRevenue);
      return popB - popA;
    });
  }

  return filtered;
});

onMounted(async () => {
  await getSellers();
});

watch(debouncedSearch, () => {
  currentPage.value = 1;
});

const filterByRange = (
  array: Seller[],
  field: 'totalUnitsSold' | 'totalRevenue',
  min: number,
  max: number,
): Seller[] => {
  return array.filter((obj) => obj[field] >= min && obj[field] <= max);
};

const handleRangeFilter = (items = sellers.value) => {
  if (minUnits.value === null || maxUnits.value === null) {
    return;
  }
  const filtered = filterByRange(items, 'totalUnitsSold', minUnits.value, maxUnits.value);
  return filtered;
};

const paginatedSellers = computed<Seller[]>(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredSellers.value.slice(start, start + itemsPerPage);
});

const resetFilters = () => {
  minUnits.value = null;
  maxUnits.value = null;
  search.value = '';
  currentPage.value = 1;
  sortOrder.value = 'default';
};
</script>

<template>
  <main>
    <header class="mb-8 text-center">
      <h1 class="text-4xl font-bold">Sellers List</h1>
      <p class="mt-2 text-gray-400">Sellers statistics</p>
    </header>

    <section class="mb-6 text-center">
      <label class="sr-only" for="search">Search sellers</label>
      <input
        id="search"
        name="search"
        class="h-8 cursor-pointer border-b text-center text-lg font-light text-white focus:shadow-lg focus:shadow-slate-500/50 focus:outline focus:transition-shadow focus:duration-300 focus:ease-out"
        type="text"
        placeholder="Enter seller name"
        v-model="search"
      />

      <SortDropdown v-model="sortOrder" />

      <div class="mt-4">
        <RangeFilter
          v-model:minUnits="minUnits"
          v-model:maxUnits="maxUnits"
          @click-search="handleRangeFilter"
          @click-reset="resetFilters"
        />
      </div>
    </section>

    <div v-if="!isLoaded" class="text-center">
      <AppLoader />
    </div>
    <template v-else>
      <section v-if="sellers.length" class="mb-10">
        <ul class="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
          <li v-for="seller in paginatedSellers" :key="seller.id">
            <SellerCard :seller class="cursor-pointer hover:bg-white/20" />
          </li>
        </ul>
      </section>

      <AppPagination
        v-if="paginatedSellers.length"
        :itemsPerPage
        :numberOfElements="filteredSellers.length"
        :currentPage
        @pageChanged="(value: number) => (currentPage = value)"
      />

      <div v-if="sellers.length === 0" class="mt-4 text-center">No sellers found.</div>
    </template>
  </main>
</template>
