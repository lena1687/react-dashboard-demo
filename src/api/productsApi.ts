import axios from 'axios';
import type {
  CategoryApiResponseType,
  ProductQueryParamsType,
  ProductsApiResponseType,
} from '../types/products.ts';

const api = axios.create({ baseURL: 'https://dummyjson.com/products' });

export const fetchProducts = async ({
  page,
  limit,
  search,
  category,
  sortBy,
  order,
}: ProductQueryParamsType): Promise<ProductsApiResponseType> => {
  const initialDataResponse: ProductsApiResponseType = {
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  };
  const skip = (page - 1) * limit;
  const queryParams = new URLSearchParams();

  if (sortBy) queryParams.set('sortBy', sortBy);
  if (order) queryParams.set('order', order);
  queryParams.set('limit', limit.toString());
  queryParams.set('skip', skip.toString());

  let url = '';

  if (category) url += `/category/${category}`;
  if (search) url += `/search?q=${search}`;

  if (queryParams.toString()) {
    url += (url.includes('?') ? '&' : '?') + queryParams.toString();
  }

  const { data } = await api.get<ProductsApiResponseType>(`${url}`);
  return data || initialDataResponse;
};

export const fetchCategories = async () => {
  const { data } = await api.get<CategoryApiResponseType[]>('/categories');
  return data;
};
