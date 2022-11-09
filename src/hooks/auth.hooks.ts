import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from 'src/components/store/notification';
import { login, refreshToken, register } from 'src/services/auth.service';

import { LoginRequest, RegisterRequest, UserWithToken } from 'src/types/types';
import { deleteTokens, setToken } from 'src/utils/utils';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation((request: LoginRequest) => login(request), {
    onSuccess: (userWithToken: UserWithToken) => {
      queryClient.setQueryData(['loggedInUser'], userWithToken);
      setToken(userWithToken.token);
      notify('✅ Signed in!');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      queryClient.setQueryData(['authError'], err.response.data.message);
      notify(`❌ ${err.response.data.message}`);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation((request: RegisterRequest) => register(request), {
    onSuccess: (userWithToken: UserWithToken) => {
      queryClient.setQueryData(['loggedInUser'], userWithToken);
      setToken(userWithToken.token);
      notify('✅ Registered new user!');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      queryClient.setQueryData(['authError'], err.response.data.message);
      notify(`❌ ${err.response.data.message}`);
    },
  });
};

export const useGetAuth = () => {
  return useQueryClient().getQueryState<UserWithToken>(['loggedInUser']);
};

export const useLogOut = () => {
  const queryClient = useQueryClient();

  return () => {
    deleteTokens();
    queryClient.clear();
  };
};

export const useCheckTokens = () => {
  const queryClient = useQueryClient();

  return useMutation(() => refreshToken(), {
    onSuccess: (userWithToken: UserWithToken) => {
      queryClient.setQueryData(['loggedInUser'], userWithToken);
      setToken(userWithToken.token);
    },
  });
};
