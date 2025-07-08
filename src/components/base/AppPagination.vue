<script setup lang="ts">
import { defineProps, computed } from 'vue';

const emit = defineEmits(['pageChanged']);

const props = defineProps<{
  numberOfElements: number;
  itemsPerPage: number;
  currentPage: number;
}>();

const totalPages = computed(() => Math.ceil(props.numberOfElements / props.itemsPerPage));

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('pageChanged', page);
  }
};
</script>
<template>
  <div v-if="totalPages > 1" class="flex flex-wrap justify-center gap-2">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="changePage(page)"
      :class="[
        'cursor-pointer rounded-lg px-4 py-2 transition',
        page === currentPage
          ? 'bg-white font-semibold text-black'
          : 'bg-gray-700 hover:bg-gray-600',
      ]"
    >
      {{ page }}
    </button>
  </div>
</template>
