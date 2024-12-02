import axiosInstancePublic from "./axiosInstancePublic";

const PRODUCT_API_BASE_URL = "/products";

export const listProductsByCategoryId = (categoryId) => {
  console.log(`Requesting products for category: ${categoryId}`);
  return axiosInstancePublic.get(`${PRODUCT_API_BASE_URL}/category/${categoryId}`);
};

export const listAllProducts = () => {
  return axiosInstancePublic.get(`${PRODUCT_API_BASE_URL}`);
};

export const addProduct = (productData) => {
  return axiosInstancePublic.post(`${PRODUCT_API_BASE_URL}`, productData);
};

export const updateProduct = (productId, updatedData) => {
  return axiosInstancePublic.put(`${PRODUCT_API_BASE_URL}/${productId}`, updatedData);
};

export const deleteProduct = (productId) => {
  return axiosInstancePublic.delete(`${PRODUCT_API_BASE_URL}/${productId}`);
};
