import { describe, expect, test } from 'vitest';
import SellerCard from '../SellersList/SellerCard.vue';
import { mount, RouterLinkStub } from '@vue/test-utils';
import type { Seller } from '@/types/Seller';

const mockSeller: Seller = {
  id: 1,
  name: 'Jan Kowalski',
  team: 'POB',
  hireDate: '2022-03-15',
  totalUnitsSold: 110,
  totalRevenue: 131623,
  averageUnitsSoldPerMonth: 55,
};

describe('SellerCard Component', () => {
  test('renders seller info correctly', () => {
    const wrapper = mount(SellerCard, {
      props: { seller: mockSeller },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.find('[data-testid="seller-name"]').text()).toBe(mockSeller.name);
    expect(wrapper.find('[data-testid="seller-team"]').text()).toBe(
      `Team: ${mockSeller.team}`,
    );
    expect(wrapper.find('[data-testid="seller-totalUnitsSold"]').text()).toBe(
      mockSeller.totalUnitsSold.toString(),
    );
    expect(wrapper.find('[data-testid="seller-hireDate"]').text()).toBe(
      `Hired: ${mockSeller.hireDate}`,
    );
    expect(wrapper.find('[data-testid="seller-averageUnitsSoldPerMonth"]').text()).toBe(
      mockSeller.averageUnitsSoldPerMonth.toString(),
    );
  });

  test('check total revenue formatting', () => {
    const wrapper = mount(SellerCard, {
      props: { seller: mockSeller },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.html()).toContain('131&nbsp;623 PLN');
  });

  test('renders correct RouterLink', () => {
    const wrapper = mount(SellerCard, {
      props: { seller: mockSeller },
      global: { stubs: { RouterLink: RouterLinkStub } },
    });

    const routerLink = wrapper.findComponent(RouterLinkStub);
    expect(routerLink.props().to).toEqual({
      name: 'sellers-details',
      params: { id: mockSeller.id },
    });
  });
});
