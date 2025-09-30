import { useMutation } from '@tanstack/react-query';
import type { RegisterResponse, RegistrationPayload } from '../types/registration.ts';
import { RegisterUser } from '../api/userApi.ts';

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegistrationPayload>({
    mutationFn: RegisterUser,
  });
}
