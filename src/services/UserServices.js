// src/services/UserServices.js
import axiosInstance from "./axiosInstance";

const USER_API_BASE_URL = "/users";

export const getAllUsers = () => axiosInstance.get(USER_API_BASE_URL);
export const getUserById = (userId) => axiosInstance.get(`${USER_API_BASE_URL}/${userId}`);
export const createUser = (userData) => axiosInstance.post(USER_API_BASE_URL, userData);
export const updateUser = (userId, userData) => axiosInstance.put(`${USER_API_BASE_URL}/${userId}`, userData);
export const deleteUser = (userId) => axiosInstance.delete(`${USER_API_BASE_URL}/${userId}`);
