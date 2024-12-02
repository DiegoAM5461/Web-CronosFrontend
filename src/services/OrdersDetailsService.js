// OrdersDetailsService
import axiosInstancePublic from "./axiosInstancePublic";

// Agregar un producto al pedido
export const addProductToOrder = (ordersDetails) => {
  return axiosInstancePublic.post(`/orders-details`, ordersDetails);
};

// Actualizar la cantidad de un producto en el pedido
export const updateProductQuantityInOrder = (ordersDetailsId, updatedDetails) => {
  return axiosInstancePublic.put(`/orders-details/${ordersDetailsId}`, updatedDetails);
};

// Eliminar un producto del pedido
export const removeProductFromOrder = (ordersId, productId, quantityToRemove) => {
  return axiosInstancePublic.patch(
    `/orders-details/${ordersId}/remove-product/${productId}`,
    null,
    { params: { quantityToRemove } }
  );
};

// Obtener los detalles de un pedido específico(ESTO USAR)
export const getOrderDetails = (ordersId) => {
  return axiosInstancePublic.get(`/orders-details/orders/${ordersId}`);
};

export const getOrdersDetailsById = (ordersDetailsId) => {
  return axiosInstancePublic.get(`/orders-details/${ordersDetailsId}`);
};

export const deleteOrdersDetails = (ordersDetailsId) => {
  return axiosInstancePublic.delete(`/orders-details/${ordersDetailsId}`);
};

// Obtener los detalles de un pedido filtrado por boxId y ordersId
export const getOrdersDetailsByBoxAndOrder = (boxId, ordersId) => {
  return axiosInstancePublic.get(`/orders-details/by-box/${boxId}/${ordersId}`);
};

// Obtener los detalles de un pedido filtrado por tableCronosId y ordersId
export const getOrdersDetailsByTableAndOrder = (tableCronosId, ordersId) => {
  return axiosInstancePublic.get(`/orders-details/by-table/${tableCronosId}/${ordersId}`);
};