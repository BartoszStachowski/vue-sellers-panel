<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { House, List } from 'lucide-vue-next';

defineProps<{
  isExpanded: boolean;
}>();

const routeItems = [
  { label: 'Home', name: 'home', path: '/', icon: House },
  { label: 'Sellers', name: 'sellers-list', path: '/sellers-list', icon: List },
];
</script>

<template>
  <aside
    class="min-h-screen overflow-hidden bg-gray-900 p-4 transition-all duration-200"
    :class="[isExpanded ? 'w-64' : 'w-16']"
  >
    <h3
      class="mb-2 text-xs text-gray-400 uppercase transition-opacity duration-300"
      :class="isExpanded ? 'opacity-100' : 'opacity-0'"
    >
      Menu
    </h3>

    <div class="flex flex-col gap-1">
      <RouterLink
        v-for="route in routeItems"
        class="flex items-center gap-2 rounded px-4 py-2 transition-all duration-200 hover:bg-gray-800"
        :key="route.name"
        :class="{
          'border-r-4 border-blue-500 bg-gray-800': $route.path === route.path,
          'justify-center': !isExpanded,
        }"
        :to="{ name: route.name }"
      >
        <div>
          <Component :is="route.icon" />
        </div>
        <div v-if="isExpanded" class="font-light transition-opacity duration-300">
          {{ route.label }}
        </div>
      </RouterLink>
    </div>
  </aside>
</template>
<style scoped></style>
