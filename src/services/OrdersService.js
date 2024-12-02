// OrdersService

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

// Obtener todos los pedidos
export const getAllOrders = () => {
  return axiosInstancePublic.get(`/orders`);
};

// Obtener un pedido por ID
export const getOrderById = (ordersId) => {
  return axiosInstancePublic.get(`/orders/${ordersId}`);
};

// Completar un pedido
export const completeOrder = (ordersId) => {
  return axiosInstancePublic.patch(`/orders/${ordersId}/completar`);
};

// Obtener pedidos por boxId
export const getOrdersByBox = (boxId) => {
  return axiosInstancePublic.get(`/orders/orders-by-box/${boxId}`);
};

// Obtener pedidos por tableId
export const getOrdersByTable = (tableId) => {
  return axiosInstancePublic.get(`/orders/orders-by-table/${tableId}`);
};

// Obtener pedidos por estado
// Obtener pedidos por múltiples estados
export const getOrdersByStatuses = (estados) => {
  return axiosInstancePublic.get(`/orders/by-status`, {
    params: { estados: estados.join(",") }, // Convertir el array en una cadena separada por comas
  });
};

export const getOrderByBoxOrTable = async (boxId, tableCronosId) => {
  try {
    if (boxId) {
      const response = await axiosInstancePublic.get(`/orders/orders-by-box/${boxId}`);
      return response.data.find((order) => order.ordersEstado === "PENDIENTE") || null;
    }

    if (tableCronosId) {
      const response = await axiosInstancePublic.get(`/orders/orders-by-table/${tableCronosId}`);
      return response.data.find((order) => order.ordersEstado === "PENDIENTE") || null;
    }

    throw new Error("Debe especificarse un boxId o tableCronosId.");
  } catch (error) {
    console.error("Error en getOrderByBoxOrTable:", error.message);
    return null; // Retornar null si hay un error o no se encuentra un pedido
  }
};
