import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { getDevices } from "src/services/device.service"
import { Device } from "src/types/types"
import { FETCH_DEFAULT_OPTIONS } from "./config"

export const useGetDevices = () => {
  return useQuery<Device[], AxiosError>(
    ['devices'],
    () => getDevices(),
    FETCH_DEFAULT_OPTIONS,
  );
}

