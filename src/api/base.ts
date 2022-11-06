import axios from 'axios';
import { queryClient } from 'src/App';
import { AUTH_BASE_URL, refreshToken } from 'src/services/auth.service';
import { UserWithToken } from 'src/types/types';
import { getToken, jwtTokenHasExpired, setToken } from 'src/utils/utils';

export const apiClient = axios.create({
  // Add FEED_APP_API_URL=https://localhost:8080 to .env
  baseURL: process.env.FEED_APP_API_URL,
});

apiClient.interceptors.request.use(
  config => {
    const token = getToken();
    const tokenHasExpired = jwtTokenHasExpired(token);

    if (token && tokenHasExpired && !config.url?.includes(AUTH_BASE_URL)) {
      console.log('setting new refreshtoken');
      refreshToken().then(data => {
        setToken(data.token);
        queryClient.setQueryData(['loggedInUser'], data);
      });
    }

    return {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
  },
  error => Promise.reject(error),
);
