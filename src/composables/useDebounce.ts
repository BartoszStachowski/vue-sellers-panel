import { ref, watch, type Ref } from 'vue';

export const useDebounce = (source: Ref<string>, delay = 300) => {
  const debounced = ref<string>(source.value);

  let timeout: ReturnType<typeof setTimeout>;

  watch(source, (val) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debounced.value = val;
    }, delay);
  });

  return debounced;
};
