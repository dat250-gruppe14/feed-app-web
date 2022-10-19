import axios from 'axios';

export const apiClient = axios.create({
    baseURL: ``,
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

