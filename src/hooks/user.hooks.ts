import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { notify } from 'src/store/notification';
import { getUser, getUsers, updateUser } from 'src/services/user.service';
import { UpdateUserRequest, User } from 'src/types/types';
import { useGetAuth } from './auth.hooks';
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

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const currentUser = useGetAuth();

  return useMutation(
    (request: UpdateUserRequest) =>
      updateUser(currentUser?.data?.user.id ?? '', request),
    {
      onSuccess: (user: User) => {
        queryClient.setQueryData(['loggedInUser'], {
          ...currentUser?.data,
          user,
        });
        notify('✅ Updated profile');
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        notify(`❌ ${err.response.data.message}`);
      },
    },
  );
};
