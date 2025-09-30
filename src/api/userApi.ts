import axios from 'axios';
import type { RegisterResponse, RegistrationPayload } from '../types/registration.ts';

const api = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' });

api.interceptors.request.use((config) => {
  if (config.url?.includes('users') && config.data.email === 'fail@example.com') {
    return Promise.reject({ status: 400, message: 'Email already in use' });
  }
  return config;
});

export const RegisterUser = async (payload: RegistrationPayload): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>('/users', payload);
  return data;
};
