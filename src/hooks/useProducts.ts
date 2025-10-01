import { useQuery } from '@tanstack/react-query';
import { FetchProducts } from '../api/productsApi.ts';
import type { ProductType } from '../types/products.ts';

export function useProductsQuery() {
  return useQuery<ProductType[]>({
    queryKey: ['products'],
    queryFn: FetchProducts,
  });
}
