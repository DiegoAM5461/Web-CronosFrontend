import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UsersCRUD.css";

// Importar funciones para la API
import { getAllEmployees, updateEmployee } from "../../services/EmployeeService";
import { getAllUsers } from "../../services/UserServices";

export const UsersCRUD = () => {
  const navigate = useNavigate();

  // Estado para el formulario
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userEstado: "ACTIVO",
    userRol: "EMPLEADO", // Valor inicial válido
    employeeId: "",
  });

  // Estados para manejar datos y mensajes
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]); // Estado para manejar usuarios

  // Función para obtener empleados
  const fetchEmployees = async () => {
    try {
      const response = await getAllEmployees();
      setEmployees(response.data);
    } catch (err) {
      console.error("Error al obtener los empleados:", err);
    }
  };

  // Función para obtener usuarios
  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (err) {
      console.error("Error al obtener los usuarios:", err);
    }
  };

  // Cargar empleados y usuarios al montar el componente
  useEffect(() => {
    fetchEmployees();
    fetchUsers();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Manejar envío del formulario
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const requestPayload = {
        username: formData.username,
        password: formData.password,
        userEstado: formData.userEstado,
        userRol: formData.userRol,
        employee: { employeeId: formData.employeeId },
      };

      const response = await axios.post(
        "http://localhost:8080/auth/register",
        requestPayload
      );

      if (response.status === 201) {
        setSuccessMessage("Usuario agregado correctamente.");
        setFormData({
          username: "",
          password: "",
          userEstado: "ACTIVO",
          userRol: "EMPLEADO",
          employeeId: "",
        });
        fetchEmployees();
        fetchUsers(); // Actualizar la tabla de usuarios
      }
    } catch (err) {
      console.error(err);
      setError(
        "Ocurrió un error al registrar al usuario. Verifique los datos e intente nuevamente."
      );
    }
  };

  // Manejar actualización del estado del empleado
  const handleUpdateEmployee = async (employeeId) => {
    try {
      const employeeToUpdate = employees.find(
        (employee) => employee.employeeId === employeeId
      );
      const updatedEmployee = {
        ...employeeToUpdate,
        estadoEmployee:
          employeeToUpdate.estadoEmployee === "INACTIVO" ? "ACTIVO" : "INACTIVO",
      };

      await updateEmployee(employeeId, updatedEmployee);

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.employeeId === employeeId ? updatedEmployee : employee
        )
      );
    } catch (err) {
      console.error("Error al actualizar el empleado:", err);
    }
  };

  return (
    <div className="col py-3">
      <div className="row">
        {/* Formulario */}
        <div className="col-lg-3 mb-4">
          <div className="container userR-main-container">
            <div className="card userR-card-container shadow">
              <div className="card-header text-center bg-primary text-white">
                <h2>Registrar Usuario</h2>
              </div>
              <div className="card-body">
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Nombre de Usuario
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control userR-input"
                      placeholder="Nombre de Usuario"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control userR-input"
                      placeholder="Contraseña"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userEstado" className="form-label">
                      Estado del Usuario
                    </label>
                    <select
                      id="userEstado"
                      className="form-select userR-select"
                      value={formData.userEstado}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="ACTIVO">Activo</option>
                      <option value="INACTIVO">Inactivo</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userRol" className="form-label">
                      Rol del Usuario
                    </label>
                    <select
                      id="userRol"
                      className="form-select userR-select"
                      value={formData.userRol}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="EMPLEADO">Empleado</option>
                      <option value="ADMINISTRADOR">Administrador</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="employeeId" className="form-label">
                      ID del Empleado
                    </label>
                    <input
                      type="text"
                      id="employeeId"
                      className="form-control userR-input"
                      placeholder="ID del Empleado"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {error && (
                    <p className="text-danger userR-error-message">{error}</p>
                  )}
                  <div className="d-flex justify-content-between">
                    <button
                      type="submit"
                      className="btn btn-primary userR-btn w-48"
                    >
                      Registrar Usuario
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary userR-btn w-48"
                      onClick={() => navigate("/")}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de empleados */}
        <div className="col-lg-9">
          <div className="card shadow mb-4">
            <div className="card-header text-center bg-success text-white">
              <h2>Lista de Empleados</h2>
            </div>
            <div className="card-body">
              <table className="table table-striped table-hover">
                <thead className="table-success">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.employeeId}>
                      <td>{employee.employeeId}</td>
                      <td>{employee.nombre}</td>
                      <td>{employee.apellido}</td>
                      <td>{employee.email}</td>
                      <td>{employee.telefono}</td>
                      <td>
                        <span
                          className={`badge ${
                            employee.estadoEmployee === "ACTIVO"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {employee.estadoEmployee}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            handleUpdateEmployee(employee.employeeId)
                          }
                        >
                          {employee.estadoEmployee === "INACTIVO"
                            ? "Activar"
                            : "Desactivar"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabla de usuarios */}
          <div className="card shadow">
            <div className="card-header text-center bg-info text-white">
              <h2>Lista de Usuarios</h2>
            </div>
            <div className="card-body">
              <table className="table table-striped table-hover">
                <thead className="table-info">
                  <tr>
                    <th>ID</th>
                    <th>Nombre de Usuario</th>
                    <th>Estado</th>
                    <th>Rol</th>
                    <th>ID del Empleado</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.userId}>
                      <td>{user.userId}</td>
                      <td>{user.username}</td>
                      <td>{user.userEstado}</td>
                      <td>{user.userRol}</td>
                      <td>{user.employeeId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
