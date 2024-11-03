import axios from 'axios';

const CLIENT_API_BASE_URL = 'http://localhost:8080/api/clients';
const BOXES_API_BASE_URL = 'http://localhost:8080/api/box-cronos';
const RESERVA_API_BASE_URL = 'http://localhost:8080/api/reservas';

// Función para obtener un cliente por ID
export const getClientById = (clientId) => {
    return axios.get(`${CLIENT_API_BASE_URL}/${clientId}`);
};

// Función para crear una reserva
export const createReserva = (reservaData) => {
    return axios.post(RESERVA_API_BASE_URL, reservaData);
};

// Función para obtener todos los boxes
export const getBoxes = () => {
    return axios.get(BOXES_API_BASE_URL);
};

// Función para crear un nuevo cliente
export const createClient = (clientData) => {
    return axios.post(CLIENT_API_BASE_URL, clientData);
};

// Función para obtener reservas disponibles según la fecha
export const getAvailableReservations = (fechaReserva) => {
    return axios.get(`${RESERVA_API_BASE_URL}/disponibles`, {
        params: { fechaReserva }
    });
};

