export type RegistrationData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegistrationPayload = Omit<RegistrationData, 'confirmPassword'>;

export interface RegisterResponse extends RegistrationPayload {
  id: number;
}
