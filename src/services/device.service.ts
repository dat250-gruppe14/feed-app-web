import { apiClient } from "src/api/base";
import { Device } from "src/types/types";

const BASE_URL = "api/device";

export const getDevices = async (): Promise<Device[]> => {
  return (await apiClient.get(BASE_URL)).data;
}

export const getDevice = async (id: string): Promise<Device> => {
  return (await apiClient.get(`${BASE_URL}/${id}`)).data;
}
