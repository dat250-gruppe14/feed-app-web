import { apiClient } from 'src/api/base';
import { LoginRequest, RegisterRequest, UserWithToken } from 'src/types/types';

export const AUTH_BASE_URL = 'api/auth';

export const login = async (req: LoginRequest): Promise<UserWithToken> => {
  return (await apiClient.post(`${AUTH_BASE_URL}/login`, req)).data;
};

export const register = async (
  req: RegisterRequest,
): Promise<UserWithToken> => {
  return (await apiClient.post(`${AUTH_BASE_URL}/register`, req)).data;
};

export const refreshToken = async (): Promise<UserWithToken> => {
  return (await apiClient.post(`${AUTH_BASE_URL}/refresh`)).data;
};
