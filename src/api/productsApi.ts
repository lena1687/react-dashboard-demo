import axios from 'axios';
import type {
  CategoryApiResponseType,
  ProductQueryParamsType,
  ProductsApiResponseType,
} from '../types/products.ts';

const api = axios.create({ baseURL: 'https://dummyjson.com/products' });

export const FetchProducts = async ({
  page,
  limit,
  search,
  category,
}: ProductQueryParamsType): Promise<ProductsApiResponseType> => {
  const initialDataResponse: ProductsApiResponseType = {
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  };
  const skip = (page - 1) * limit;
  let url = '';
  let params = `?limit=${limit}&skip=${skip}`;
  if (category) url += `/category/${category}${params}`;
  if (search) url += `/search?q=${search}`;

  const { data } = await api.get<ProductsApiResponseType>(`${url}`);
  return data || initialDataResponse;
};

export const FetchCategories = async () => {
  const { data } = await api.get<CategoryApiResponseType[]>('/categories');
  return data;
};
