import { mount, RouterLinkStub } from '@vue/test-utils';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import AppSidebar from '@/components/layout/AppSidebar.vue';

let mockPath = '/';
vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router');
  return {
    ...actual,
    useRoute: () => ({ path: mockPath }),
  };
});

const factory = (props = {}) =>
  mount(AppSidebar, {
    props: { isExpanded: true, ...props },
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
        House: { template: '<div />' },
        List: { template: '<div />' },
        X: { template: '<button>x</button>' },
      },
    },
  });

describe('AppSidebar Component', () => {
  beforeEach(() => {
    mockPath = '/';
  });

  test('renders close button when isExpanded is true', () => {
    const wrapper = factory({ isExpanded: true });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  test('does not render close button when isExpanded is false', () => {
    const wrapper = factory({ isExpanded: false });
    expect(wrapper.find('button').exists()).toBe(false);
  });

  test('emits close event when close button is clicked', async () => {
    const wrapper = factory({ isExpanded: true });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  test('renders all route items as links', () => {
    const wrapper = factory();
    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links).toHaveLength(2);
    expect(links[0].text()).toContain('Home');
    expect(links[1].text()).toContain('Sellers');
  });

  test('adds active class to current route', () => {
    mockPath = '/';
    const wrapper = factory();
    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links[0].classes()).toContain('border-blue-500');
    expect(links[1].classes()).not.toContain('border-blue-500');
  });

  test('adds active class to Sellers when path is /sellers', () => {
    mockPath = '/sellers';
    const wrapper = factory();
    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links[1].classes()).toContain('border-blue-500');
    expect(links[0].classes()).not.toContain('border-blue-500');
  });

  test('emits close event when a link is clicked', async () => {
    const wrapper = factory();
    const links = wrapper.findAllComponents(RouterLinkStub);
    await links[0].trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
