import axios from 'axios';
import type { ProductsApiResponseType } from '../types/products.ts';

const api = axios.create({ baseURL: 'https://dummyjson.com/products' });

export const FetchProducts = async (
  page: number,
  limit: number,
): Promise<ProductsApiResponseType> => {
  const skip = (page - 1) * limit;
  const { data } = await api.get<ProductsApiResponseType>(`?limit=${limit}&skip=${skip}`);
  return data || [];
};
