import { apiClient } from "src/api/base";
import { User } from "src/types/types";

const BASE_URL = "api/user";

export const getUsers = async (): Promise<User[]> => {
  return (await apiClient.get(BASE_URL)).data;
}

export const getUser = async (id: string): Promise<User> => {
  return (await apiClient.get(`${BASE_URL}/${id}`)).data;
}
