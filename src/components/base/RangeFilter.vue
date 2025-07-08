<script setup lang="ts">
import { watch } from 'vue';
const minUnits = defineModel<number | null | string>('minUnits');
const maxUnits = defineModel<number | null | string>('maxUnits');
const emit = defineEmits(['click-search', 'click-reset']);

watch(minUnits, (val) => {
  if (val === '') minUnits.value = null;
});
watch(maxUnits, (val) => {
  if (val === '') maxUnits.value = null;
});
</script>
<template>
  <div class="flex flex-wrap justify-center gap-2">
    <label class="sr-only" for="min-units">Minimum units sold</label>
    <input
      id="min-units"
      name="min-units"
      class="h-8 cursor-pointer border-b text-center text-lg font-light text-white focus:shadow-lg focus:shadow-slate-500/50 focus:outline focus:transition-shadow focus:duration-300 focus:ease-out"
      type="number"
      placeholder="Min units sold"
      v-model.number="minUnits"
    />
    <label class="sr-only" for="max-units">Maximum units sold</label>
    <input
      id="max-units"
      name="max-units"
      class="h-8 cursor-pointer border-b text-center text-lg font-light text-white focus:shadow-lg focus:shadow-slate-500/50 focus:outline focus:transition-shadow focus:duration-300 focus:ease-out"
      type="number"
      placeholder="Max units sold"
      v-model.number="maxUnits"
    />
  </div>
  <div class="flex flex-col items-center justify-center">
    <button
      class="mt-4 cursor-pointer rounded-lg bg-gray-700 px-4 py-2 transition hover:bg-gray-600"
      @click="emit('click-search')"
    >
      Search total units sold by range
    </button>
    <button
      @click="emit('click-reset')"
      class="mt-4 cursor-pointer rounded-lg bg-gray-700 px-4 py-2 transition hover:bg-gray-600"
    >
      Reset
    </button>
  </div>
</template>
