import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SortSelect from '../base/SortDropdown.vue';
import type { SortOrder } from '@/types/SortOrder';

describe('SortDropdown Component', () => {
  test('renders all options', () => {
    const wrapper = mount(SortSelect, {
      props: { modelValue: 'default' as SortOrder },
    });
    const options = wrapper.findAll('option');
    const optionValues = options.map((opt) => opt.attributes('value'));
    expect(optionValues).toEqual([
      'default',
      'name-asc',
      'name-desc',
      'totalRevenue-asc',
      'totalRevenue-desc',
    ]);
  });

  test('shows the correct initial value', () => {
    const wrapper = mount(SortSelect, {
      props: { modelValue: 'totalRevenue-asc' as SortOrder },
    });
    const select = wrapper.find('select').element as HTMLSelectElement;
    expect(select.value).toBe('totalRevenue-asc');
  });

  test('emits update:modelValue when changed', async () => {
    const wrapper = mount(SortSelect, {
      props: { modelValue: 'default' as SortOrder },
    });
    const select = wrapper.find('select');
    await select.setValue('name-desc');
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['name-desc']);
  });
});
