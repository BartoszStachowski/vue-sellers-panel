<script setup lang="ts">
import type { SortOrder } from '../../types/SortOrder';

const sortModel = defineModel<SortOrder>();
</script>

<template>
  <div class="mt-4 text-white">
    <label for="sort-select" class="mr-2">Sort:</label>
    <select
      id="sort-select"
      class="rounded bg-gray-800 px-2 py-1 text-white"
      v-model="sortModel"
    >
      <option value="default">Default</option>
      <option value="name-asc">Name A-Z</option>
      <option value="name-desc">Name Z-A</option>
      <option value="totalRevenue-asc">Total revenue ↑</option>
      <option value="totalRevenue-desc">Total revenue ↓</option>
    </select>
  </div>
</template>

<style scoped></style>
