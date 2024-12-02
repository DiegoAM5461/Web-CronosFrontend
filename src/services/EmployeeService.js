//EmployeeService.js
import axiosInstancePublic from "./axiosInstancePublic";

// Crear un nuevo empleado
export const createEmployee = (employee) => {
  return axiosInstancePublic.post("/employees", employee);
};

// Obtener un empleado por su ID
export const getEmployeeById = (employeeId) => {
  return axiosInstancePublic.get(`/employees/${employeeId}`);
};

// Obtener la lista de todos los empleados
export const getAllEmployees = () => {
  return axiosInstancePublic.get("/employees");
};

// Actualizar un empleado
export const updateEmployee = (employeeId, updatedEmployee) => {
  return axiosInstancePublic.put(`/employees/${employeeId}`, updatedEmployee);
};

// Eliminar un empleado (esto marca su estado como INACTIVO)
export const deleteEmployee = (employeeId) => {
  return axiosInstancePublic.delete(`/employees/${employeeId}`);
};