<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { House, List, X } from 'lucide-vue-next';
import { defineProps, defineEmits } from 'vue';

defineProps<{
  isExpanded: boolean;
}>();
const emit = defineEmits(['close']);

const routeItems = [
  { label: 'Home', name: 'home', path: '/', icon: House },
  { label: 'Sellers', name: 'sellers-list', path: '/sellers-list', icon: List },
];
</script>

<template>
  <aside class="flex h-full flex-col bg-gray-900 p-4 transition-all duration-300">
    <button class="mb-2 self-end lg:hidden" @click="emit('close')" v-if="isExpanded">
      <X />
    </button>

    <h3 class="mb-2 text-xs text-gray-400 uppercase">Menu</h3>
    <div class="flex flex-col gap-1">
      <RouterLink
        v-for="route in routeItems"
        class="flex items-center gap-2 rounded px-4 py-2 transition-all duration-200 hover:bg-gray-800"
        :key="route.name"
        :class="{
          'border-r-4 border-blue-500 bg-gray-800': $route.path === route.path,
        }"
        :to="{ name: route.name }"
        @click="emit('close')"
      >
        <Component :is="route.icon" />
        <span>{{ route.label }}</span>
      </RouterLink>
    </div>
  </aside>
</template>
