import axios from 'axios';
import type { Seller } from '@/types/Seller';

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/BartoszStachowski/vue-sellers-panel',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getSellers(page?: number) {
    if (!page) {
      return apiClient.get<Seller[]>(`/sellers`);
    }

    return apiClient.get<Seller[]>(`/sellers?_limit=3&_page=${page}`);
  },
  getSeller(id: number) {
    return apiClient.get<Seller>(`/sellers/${id}`);
  },
};
