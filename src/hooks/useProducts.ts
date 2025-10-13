import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchProducts } from '../api/productsApi.ts';
import type {
  CategoryApiResponseType,
  ProductQueryParamsType,
  ProductsApiResponseType,
} from '../types/products.ts';

export function useProductsQuery({
  page,
  limit,
  search,
  category,
  sortBy,
  order,
}: ProductQueryParamsType) {
  return useQuery<ProductsApiResponseType, Error>({
    queryKey: ['products', page, limit, search, category, sortBy, order],
    queryFn: () => fetchProducts({ page, limit, search, category, sortBy, order }),
    placeholderData: (prev) => prev, // keeps old data while fetching
  });
}

export function useCategoriesQuery() {
  return useQuery<CategoryApiResponseType[], Error>({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  });
}
