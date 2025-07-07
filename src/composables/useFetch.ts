import { ref } from 'vue';

export async function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const isFetching = ref(true);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const result = await response.json();
    data.value = result;
  } catch (err) {
    error.value = err instanceof Error ? err : new Error('Unknown error');
  } finally {
    isFetching.value = false;
  }

  return {
    data,
    error,
    isFetching,
  };
}
