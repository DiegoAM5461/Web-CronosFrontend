// src/services/HistorialReservaServices.js
import axiosInstance from "./axiosInstance";

const HISTORIAL_API_BASE_URL = "/historial-reservas";

// Función para obtener todos los historiales de reservas
export const getAllHistorialReservas = () => axiosInstance.get(HISTORIAL_API_BASE_URL);

// Función para filtrar historial por fecha de reserva
export const filterHistorialByFechaReserva = (fechaReserva) => {
    // Asegurarse de que la fecha esté en formato YYYY-MM-DD
    const formattedDate = fechaReserva.split("T")[0]; // Si ya es YYYY-MM-DD, este paso puede ser innecesario
    return axiosInstance.get(`${HISTORIAL_API_BASE_URL}/filtrar/fechaReserva`, { params: { fechaReserva: formattedDate } });
};

// Resto de las funciones de filtro
export const filterHistorialByClientId = (clientId) => axiosInstance.get(`${HISTORIAL_API_BASE_URL}/filtrar/clienteId/${clientId}`);
export const filterHistorialByReservaId = (reservaId) => axiosInstance.get(`${HISTORIAL_API_BASE_URL}/filtrar/reservaId/${reservaId}`);
export const filterHistorialByEstadoReserva = (estadoReserva) =>
    axiosInstance.get(`${HISTORIAL_API_BASE_URL}/filtrar/estadoReserva/${estadoReserva}`);
