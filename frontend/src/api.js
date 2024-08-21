import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/'
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await api.post('api/token/refresh/', {
                    refresh: refreshToken,
                });

                const newToken = response.data.access;
                localStorage.setItem('token', newToken);

                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;