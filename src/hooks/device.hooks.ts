import { useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { getDevice, getDevices } from "src/services/device.service"
import { Device } from "src/types/types"
import { FETCH_DEFAULT_OPTIONS } from "./config"

export const useGetDevices = () => {
  return useQuery<Device[], AxiosError>(
    ['devices'],
    () => getDevices(),
    FETCH_DEFAULT_OPTIONS,
  );
}

export const useGetDevice = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery<Device, AxiosError>(
    ['devices', id],
    () => getDevice(id),
    {
      ...FETCH_DEFAULT_OPTIONS,
      initialData: () => queryClient.getQueryData<Device[]>(['devices'])?.find(d => d.id === id),
      initialDataUpdatedAt: () => queryClient.getQueryState(['devices'])?.dataUpdatedAt,
    }
  );
}