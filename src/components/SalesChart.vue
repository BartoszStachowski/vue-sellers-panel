<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { Seller } from '@/types/Seller';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const props = defineProps<{ seller: Seller }>();

// All categories from all sales
const allCategoriesSet = new Set<string>();
props.seller.sales.forEach((sale) => {
  sale.categories.forEach((cat) => allCategoriesSet.add(cat.category));
});
const allCategories = Array.from(allCategoriesSet);

// assign by order or category key
const categoryColors: Record<string, string> = {
  accessories: '#2563eb',
  clothes: '#16a34a',
  electronics: '#f59e42',
  house: '#e11d48',
};

// if category not in colors, use default
function getColor(category: string, idx: number) {
  return (
    categoryColors[category] ||
    ['#6366f1', '#22d3ee', '#facc15', '#a21caf', '#f43f5e', '#64748b'][idx % 6]
  );
}

const months = props.seller.sales.map((sale) => sale.month);

const datasets = allCategories.map((category, idx) => {
  const data = props.seller.sales.map((sale) => {
    const cat = sale.categories.find((c) => c.category === category);
    return cat ? cat.unitsSold : 0;
  });
  return {
    label: category.charAt(0).toUpperCase() + category.slice(1),
    data,
    backgroundColor: getColor(category, idx),
    borderRadius: 6,
  };
});

const chartData = {
  labels: months,
  datasets,
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    title: { display: true, text: 'Monthly sales by category' },
  },
};
</script>

<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
