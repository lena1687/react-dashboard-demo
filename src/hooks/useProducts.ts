import { useQuery } from '@tanstack/react-query';
import { FetchProducts } from '../api/productsApi.ts';
import type { ProductsApiResponseType } from '../types/products.ts';

export function useProductsQuery(page: number, limit: number) {
  return useQuery<ProductsApiResponseType, Error>({
    queryKey: ['products', page],
    queryFn: () => FetchProducts(page, limit),
    placeholderData: (prev) => prev, // keeps old data while fetching
  });
}
