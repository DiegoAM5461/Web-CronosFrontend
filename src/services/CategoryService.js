import axiosInstancePublic from "./axiosInstancePublic";

const CATEGORY_API_BASE_URL = "/categories";

// Obtener todas las categorías
export const listAllCategories = () => {
  return axiosInstancePublic.get(`${CATEGORY_API_BASE_URL}`);
};