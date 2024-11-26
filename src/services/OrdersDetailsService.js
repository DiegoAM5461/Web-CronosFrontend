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

// Obtener los detalles de un pedido específico
export const getOrderDetails = (ordersId) => {
  return axiosInstancePublic.get(`/orders-details/orders/${ordersId}`);
};
