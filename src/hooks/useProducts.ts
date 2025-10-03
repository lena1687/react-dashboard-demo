import { useQuery } from '@tanstack/react-query';
import { FetchCategories, FetchProducts } from '../api/productsApi.ts';
import type {
  CategoryApiResponseType,
  ProductQueryParamsType,
  ProductsApiResponseType,
} from '../types/products.ts';

export function useProductsQuery({ page, limit, search, category }: ProductQueryParamsType) {
  return useQuery<ProductsApiResponseType, Error>({
    queryKey: ['products', page, limit, search, category],
    queryFn: () => FetchProducts({ page, limit, search, category }),
    placeholderData: (prev) => prev, // keeps old data while fetching
  });
}

export function useCategoriesQuery() {
  return useQuery<CategoryApiResponseType[], Error>({
    queryKey: ['categories'],
    queryFn: () => FetchCategories(),
  });
}
