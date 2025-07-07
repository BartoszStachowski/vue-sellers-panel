type Team = 'POB' | 'SOL' | 'AP';

interface SellerCategoryStats {
  category: string;
  unitsSold: number;
  totalRevenue: number;
}

interface SellerMonthlySales {
  month: string;
  categories: SellerCategoryStats[];
}

export interface Seller {
  id: number;
  name: string;
  hireDate: string;
  team: Team;
  totalUnitsSold: number;
  totalRevenue: number;
  averageUnitsSoldPerMonth: number;
  sales: SellerMonthlySales[];
}
