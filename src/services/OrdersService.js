import axiosInstancePublic from "./axiosInstancePublic";

// Obtener los detalles del carrito de un pedido específico
export const getCart = (ordersId) => {
  return axiosInstancePublic.get(`/orders/${ordersId}/carrito`);
};

// Eliminar un pedido completo
export const deleteOrder = (ordersId) => {
  return axiosInstancePublic.delete(`/orders/${ordersId}`);
};

// Cancelar un pedido
export const cancelOrder = (ordersId) => {
  return axiosInstancePublic.patch(`/orders/${ordersId}/cancelar`);
};

// Crear un pedido
export const createOrder = (orderData) => {
  return axiosInstancePublic.post(`/orders`, orderData);
};

// Confirmar un pedido
export const confirmOrder = (ordersId) => {
  return axiosInstancePublic.patch(`/orders/${ordersId}/confirmar`);
};
