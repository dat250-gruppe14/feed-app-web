import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getUser, getUsers } from 'src/services/user.service';
import { User } from 'src/types/types';
import { FETCH_DEFAULT_OPTIONS } from './config';

export const useGetUsers = () => {
  return useQuery<User[], AxiosError>(
    ['users'],
    () => getUsers(),
    FETCH_DEFAULT_OPTIONS,
  );
};

export const useGetUser = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery<User, AxiosError>(['users', id], () => getUser(id), {
    ...FETCH_DEFAULT_OPTIONS,
    initialData: () =>
      queryClient.getQueryData<User[]>(['users'])?.find(u => u.id === id),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(['users'])?.dataUpdatedAt,
  });
};
