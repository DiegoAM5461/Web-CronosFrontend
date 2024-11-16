import { Button } from "../components/ButtonC/Button";
import "./Pages-Css/Registro.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Registro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    fechaNacimiento: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRegistroClick = (event) => {
    event.preventDefault();

    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
    const phonePattern = /^[0-9]{10}$/;
    const dniPattern = /^[0-9]{8}$/;

    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.apellido) newErrors.apellido = "El apellido es obligatorio.";
    if (!formData.telefono) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!phonePattern.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener exactamente 10 dígitos.";
    }
    if (!formData.email) {
      newErrors.email = "El email es obligatorio.";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "El email debe ser un correo válido de Gmail, Hotmail o Outlook.";
    }
    if (!formData.employeeId) {
      newErrors.employeeId = "El DNI es obligatorio.";
    } else if (!dniPattern.test(formData.employeeId)) {
      newErrors.employeeId = "El DNI debe tener exactamente 8 dígitos.";
    }

    // Validación de edad mínima (18 años)
    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
    } else {
      const birthDate = new Date(formData.fechaNacimiento);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear(); // Cambiar a 'let'
      const monthDifference = currentDate.getMonth() - birthDate.getMonth();
      const dayDifference = currentDate.getDate() - birthDate.getDate();

      // Ajuste de edad si el cumpleaños de este año aún no ha pasado
      if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
      }

      if (age < 18) {
        newErrors.fechaNacimiento = "Debes tener al menos 18 años.";
      }
    }

    if (!formData.contrasena) newErrors.contrasena = "La contraseña es obligatoria.";
    if (!formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "Confirmar contraseña es obligatorio.";
    } else if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "Las contraseñas no coinciden.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      navigate("/login");
    }
  };

  return (
    <div className="registro-containerPadre">
      <div className="registro-container">
        <NavLink className="regresar-inicio" to="/">X</NavLink>
        <h2>Registro</h2>
        <p>Esto solo tomará unos minutos</p>
        <form>
          <InputField
            id="employeeId"
            placeholder="DNI"
            value={formData.employeeId}
            onChange={handleInputChange}
            error={errors.employeeId}
            maxLength={8} // Limitar a 8 caracteres
          />
          <InputField
            id="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            error={errors.nombre}
          />
          <InputField
            id="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            error={errors.apellido}
          />
          <InputField
            id="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleInputChange}
            error={errors.telefono}
            maxLength={10} // Limitar a 10 caracteres
          />
          <InputField
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <InputField
            id="fechaNacimiento"
            type="date"
            placeholder="Fecha de Nacimiento"
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
            error={errors.fechaNacimiento}
          />
          <Button
            className="boton-registrar"
            title="Registrar"
            onClick={handleRegistroClick}
          />
        </form>
      </div>
    </div>
  );
};

const InputField = ({ id, type = "text", placeholder, value, onChange, error, maxLength }) => (
  <div className="form-control">
    <label htmlFor={id}></label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength} // Aplicar el límite de caracteres
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);
