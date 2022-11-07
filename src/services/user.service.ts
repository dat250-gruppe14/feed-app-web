import { apiClient } from 'src/api/base';
import { UpdateUserRequest, User } from 'src/types/types';

const BASE_URL = 'api/user';

export const getUsers = async (): Promise<User[]> => {
  return (await apiClient.get(BASE_URL)).data;
};

export const getUser = async (id: string): Promise<User> => {
  return (await apiClient.get(`${BASE_URL}/${id}`)).data;
};

export const updateUser = async (
  id: string,
  req: UpdateUserRequest,
): Promise<User> => {
  return (await apiClient.put(`${BASE_URL}/${id}`, req)).data;
};
