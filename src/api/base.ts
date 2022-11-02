import axios from 'axios';

export const apiClient = axios.create({
  // Add FEED_APP_API_URL=https://localhost:8080 to .env
  baseURL: process.env.FEED_APP_API_URL,
});

apiClient.interceptors.request.use((config) => {
  // TODO: something like this
  // const token = useAuthStore().getState().token
  return({
    ...config,
    headers: {
      // "Authorization": `Bearer ${token}`,
    },
  })
},
error => Promise.reject(error),
)

