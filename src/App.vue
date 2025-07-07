<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import { PanelLeft } from 'lucide-vue-next';

import { ref } from 'vue';
const isExpanded = ref(true);
</script>

<template>
  <div class="app">
    <!-- Sidebar -->
    <AppSidebar :isExpanded />

    <div class="w-full p-4">
      <header class="mb-4">
        <button
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-white hover:bg-gray-800"
          @click="isExpanded = !isExpanded"
        >
          <PanelLeft :size="28" />
        </button>
      </header>
      <RouterView />
    </div>
  </div>
</template>

<style>
.app {
  display: flex;
  background-color: #020617; /* Light background for contrast */
  color: white;
}
</style>
