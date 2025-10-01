import axios from 'axios';
import type { ProductType } from '../types/products.ts';

const api = axios.create({ baseURL: 'https://dummyjson.com/products' });

export const FetchProducts = async (): Promise<ProductType[]> => {
  const { data } = await api.get<{ products: ProductType[] }>('/');
  return data.products;
};
