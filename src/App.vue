<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import { PanelLeft } from 'lucide-vue-next';
import { ref } from 'vue';
const isSidebarOpen = ref(false);
</script>

<template>
  <div class="min-h-screen bg-[#020617] text-white">
    <AppSidebar
      :isExpanded="isSidebarOpen"
      @close="isSidebarOpen = false"
      class="fixed top-0 left-0 z-50 h-screen w-64 -translate-x-full bg-gray-900 transition-transform duration-300 lg:translate-x-0"
      :class="{ 'translate-x-0': isSidebarOpen }"
    />

    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 transition lg:hidden"
      @click="isSidebarOpen = false"
    />

    <div class="lg:ml-64">
      <header class="p-4 lg:hidden">
        <button
          class="flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-gray-800"
          @click="isSidebarOpen = true"
        >
          <PanelLeft :size="28" />
        </button>
      </header>
      <main class="mx-auto max-w-5xl p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>
