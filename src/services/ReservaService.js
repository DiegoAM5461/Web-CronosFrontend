// src/services/ReservaService.js
import axiosInstancePublic from "./axiosInstancePublic";

// Definir las rutas base de la API para cada recurso
const CLIENT_API_BASE_URL = "/clients";
const BOXES_API_BASE_URL = "/box-cronos";
const RESERVA_API_BASE_URL = "/reservas";

// Función para obtener un cliente por ID
export const getClientById = (clientId) => {
    return axiosInstancePublic.get(`${CLIENT_API_BASE_URL}/${clientId}`);
};

// Función para crear una reserva
export const createReserva = (reservaData) => {
    return axiosInstancePublic.post(RESERVA_API_BASE_URL, reservaData);
};

// Función para obtener todos los boxes
export const getBoxes = () => {
    return axiosInstancePublic.get(BOXES_API_BASE_URL);
};

// Función para crear un nuevo cliente
export const createClient = (clientData) => {
    return axiosInstancePublic.post(CLIENT_API_BASE_URL, clientData);
};

// Función para actualizar una reserva
export const updateReserva = (reservaId, updatedReserva) => {
    return axiosInstancePublic.put(`${RESERVA_API_BASE_URL}/${reservaId}`, updatedReserva);
};

// Función para eliminar (cancelar) una reserva
export const deleteReserva = (reservaId) => {
    return axiosInstancePublic.delete(`${RESERVA_API_BASE_URL}/${reservaId}`);
};

// Función para obtener todas las reservas
export const getAllReservas = () => {
    return axiosInstancePublic.get(RESERVA_API_BASE_URL);
};

// Función para actualizar automáticamente los estados de las reservas
export const actualizarReservas = () => {
    return axiosInstancePublic.put(`${RESERVA_API_BASE_URL}/estado/actualizar`);
};

// Función para obtener reservas disponibles según la fecha
export const getAvailableReservations = (fechaReserva) => {
    return axiosInstancePublic.get(`${RESERVA_API_BASE_URL}/disponibles`, {
        params: { fechaReserva }
    });
};

// Función para obtener reservas por fecha y estado
export const getReservasByFechaAndEstado = (fecha, estado) => {
    return axiosInstancePublic.get(`${RESERVA_API_BASE_URL}`, {
        params: { fecha, estado },
    });
};