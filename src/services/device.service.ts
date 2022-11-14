import { apiClient } from "src/api/base";
import { Device, DeviceCreateRequest, DeviceUpdateRequest } from "src/types/types";

const BASE_URL = "api/deviceManager";

export const getDevices = async (): Promise<Device[]> => {
  return (await apiClient.get(BASE_URL)).data;
}

export const createDevice = async (request: DeviceCreateRequest): Promise<Device> => {
  return (await apiClient.post<Device>(BASE_URL, request)).data;
}

export const updateDevice = async (request: DeviceUpdateRequest): Promise<Device> => {
  return (await apiClient.patch<Device>(`${BASE_URL}/${request.id}`, { name: request.name, pollPincode: request.pollPincode })).data;
}

export const deleteDevice = async (id: string): Promise<Device> => {
  return (await apiClient.delete(`${BASE_URL}/${id}`)).data;
};

