import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from 'src/store/notification';
import { login, refreshToken, register } from 'src/services/auth.service';

import { LoginRequest, RegisterRequest, UserWithToken } from 'src/types/types';
import { deleteTokens, setToken } from 'src/utils/utils';
import { setUserStatus } from 'src/store/userStatus';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation((request: LoginRequest) => login(request), {
    onMutate: () => {
      setUserStatus('loading');
    },
    onSuccess: (userWithToken: UserWithToken) => {
      queryClient.setQueryData(['loggedInUser'], userWithToken);
      setToken(userWithToken.token);
      setUserStatus('success');
      notify('✅ Signed in!');
      queryClient.invalidateQueries(['polls']);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      queryClient.setQueryData(['authError'], err.response.data.message);
      setUserStatus('error');
      notify(`❌ ${err.response.data.message}`);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation((request: RegisterRequest) => register(request), {
    onMutate: () => {
      setUserStatus('loading');
    },
    onSuccess: (userWithToken: UserWithToken) => {
      queryClient.setQueryData(['loggedInUser'], userWithToken);
      setToken(userWithToken.token);
      setUserStatus('success');
      notify('✅ Registered new user!');
      queryClient.invalidateQueries(['polls']);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      queryClient.setQueryData(['authError'], err.response.data.message);
      notify(`❌ ${err.response.data.message}`);
      setUserStatus('success');
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
    onMutate: () => {
      setUserStatus('loading');
    },
    onSuccess: (userWithToken: UserWithToken) => {
      queryClient.setQueryData(['loggedInUser'], userWithToken);
      setToken(userWithToken.token);
      setUserStatus('success');
      queryClient.invalidateQueries(['polls']);
    },
    onError: () => {
      setUserStatus('error');
    },
  });
};
