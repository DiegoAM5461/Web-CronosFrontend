// src/services/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Asegúrate de que este sea el URL base correcto para tu API
});

// Interceptor para agregar el token de autorización en cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar expiración del token y renovación usando el refreshToken
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(`${axiosInstance.defaults.baseURL}/refresh-token`, { refreshToken });
          const { accessToken: newAccessToken } = response.data;
          localStorage.setItem("accessToken", newAccessToken);
          axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest); // Reintenta la solicitud original con el nuevo token
        } catch (error) {
          console.error("Error al renovar el token:", error);
          // Opcionalmente, redirige a la página de login si falla la renovación
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
