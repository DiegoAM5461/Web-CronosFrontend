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

// Función para obtener reservas disponibles según la fecha
export const getAvailableReservations = (fechaReserva) => {
    return axiosInstancePublic.get(`${RESERVA_API_BASE_URL}/disponibles`, {
        params: { fechaReserva }
    });
};
