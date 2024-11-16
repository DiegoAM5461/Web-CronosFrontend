// src/services/axiosInstancePublic.js
import axios from "axios";


const axiosInstancePublic = axios.create({
  baseURL: "http://localhost:8080/api", // Ajusta la URL base según sea necesario
  headers: { "Content-Type": "application/json" } // Evita incluir Authorization aquí
});

// Interceptor para registrar todas las solicitudes
axiosInstancePublic.interceptors.request.use(request => {
  console.log('Axios Request:', request); // Esto imprimirá cada solicitud en la consola del navegador
  return request;
}, error => {
  console.error('Axios Request Error:', error); // Esto imprimirá cualquier error durante la solicitud
  return Promise.reject(error);
});

export default axiosInstancePublic;

