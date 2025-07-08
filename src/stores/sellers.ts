import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Seller } from '@/types/Seller';
import SellersService from '@/services/SellersService';
import { useRouter } from 'vue-router';

export const useSellersStore = defineStore('sellers-store', () => {
  const sellers = ref<Seller[]>([]);
  const seller = ref<Seller | null>(null);
  const isLoaded = ref(true);
  const router = useRouter();

  const getSellers = async () => {
    if (sellers.value.length !== 0) return;
    isLoaded.value = false;

    SellersService.getSellers()
      .then((response) => {
        sellers.value = response.data;
      })
      .catch((error) => {
        console.error('Error fetching sellers:', error);
        if (error.response && error.response.status === 404) {
          router.push({
            name: '404-resource',
            params: { resource: 'sellers' },
          });
        }
      })
      .finally(() => {
        isLoaded.value = true;
      });
  };

  const getSeller = async (id: number) => {
    if (sellers.value.length > 0) {
      seller.value = sellers.value.find((seller) => seller.id === id) || null;
      return;
    }

    isLoaded.value = false;

    SellersService.getSeller(id)
      .then((response) => {
        seller.value = response.data;
      })
      .catch((error) => {
        console.error('Error fetching seller:', error);
        if (error.response && error.response.status === 404) {
          router.push({
            name: '404-resource',
            params: { resource: 'seller' },
          });
        }
      })
      .finally(() => {
        isLoaded.value = true;
      });
  };

  return {
    isLoaded,
    sellers,
    seller,
    getSellers,
    getSeller,
  };
});
