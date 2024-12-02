import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Pages-Css/Registro.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createEmployee } from "../services/EmployeeService";

export const Registro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    estadoEmployee: "ACTIVO"
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Validación para DNI (máximo 8 dígitos y numérico)
    if (id === "employeeId" && (value.length > 8 || isNaN(value))) {
      return;
    }

    // Validación para teléfono (máximo 9 dígitos y numérico)
    if (id === "telefono" && (value.length > 9 || isNaN(value))) {
      return;
    }

    setFormData({ ...formData, [id]: value });
  };

  const handleRegistroClick = async (event) => {
    event.preventDefault();
    setError("");

    // Validaciones simples
    if (
      !formData.employeeId ||
      !formData.nombre ||
      !formData.apellido ||
      !formData.email ||
      !formData.telefono ||
      !formData.fechaNacimiento
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Validación de DNI con exactamente 8 dígitos
    if (formData.employeeId.length !== 8) {
      setError("El DNI debe tener exactamente 8 dígitos.");
      return;
    }

    // Validación de teléfono con exactamente 9 dígitos
    if (formData.telefono.length !== 9) {
      setError("El teléfono debe tener exactamente 9 dígitos.");
      return;
    }

    // Validación de fecha de nacimiento (mayor a 18 años)
    const birthDate = new Date(formData.fechaNacimiento);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    const dayDifference = currentDate.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    if (age < 18) {
      setError("Debes tener al menos 18 años para registrarte.");
      return;
    }

    try {
      // Llama al servicio para crear el empleado
      await createEmployee(formData);
      alert("Cuenta creada exitosamente.");
      navigate("/login"); // Redirige al login
    } catch (error) {
      setError("Error al crear la cuenta. Por favor, intente de nuevo.");
      console.error(error);
    }
  };

  return (
    <div className="registro-containerPadre d-flex align-items-center justify-content-center">
      <div className="registro-container card shadow-lg p-4 rounded-4">
        <h2 className="text-center text-white mb-4">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <i className="bi bi-person-badge"></i>
            </span>
            <input
              type="text"
              id="employeeId"
              className="form-control"
              placeholder="DNI (8 dígitos)"
              value={formData.employeeId}
              onChange={handleInputChange}
              maxLength="8" // Evita ingresar más de 8 caracteres
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <i className="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              id="nombre"
              className="form-control"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <i className="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              id="apellido"
              className="form-control"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <i className="bi bi-envelope-fill"></i>
            </span>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <i className="bi bi-telephone-fill"></i>
            </span>
            <input
              type="text"
              id="telefono"
              className="form-control"
              placeholder="Teléfono (9 dígitos)"
              value={formData.telefono}
              onChange={handleInputChange}
              maxLength="9" // Evita ingresar más de 9 caracteres
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <i className="bi bi-calendar-fill"></i>
            </span>
            <input
              type="date"
              id="fechaNacimiento"
              className="form-control"
              placeholder="Fecha de Nacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="btn btn-warning text-white w-100 mb-3 rounded-pill"
            onClick={handleRegistroClick}
          >
            Create Account
          </button>
          <button
            className="btn btn-secondary w-100 rounded-pill"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
