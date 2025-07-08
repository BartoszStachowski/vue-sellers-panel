<script setup lang="ts">
defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page',
  },
});
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center">
    <h1>Oops!</h1>
    <h3>The {{ resource }} you're looking for is not here.</h3>
    <button
      class="mt-4 cursor-pointer rounded-lg bg-gray-700 px-4 py-2 transition hover:bg-gray-600"
    >
      <router-link :to="{ name: 'sellers-list' }"> Back to the sellers list </router-link>
    </button>
  </div>
</template>
