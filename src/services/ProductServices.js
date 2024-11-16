import axiosInstancePublic from "./axiosInstancePublic";

const PRODUCT_API_BASE_URL = "/products";

export const listProductsByCategoryId = (categoryId) =>
  axiosInstancePublic.get(`${PRODUCT_API_BASE_URL}/category/${categoryId}`);
