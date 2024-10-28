import { Button } from "../components/ButtonC/Button";
import "./Pages-Css/Registro.css";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { useState } from "react";

export const Registro = () => {
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  // Estados para almacenar los valores de los campos y los mensajes de error
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [errors, setErrors] = useState({});

  // Maneja cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Maneja el clic en el botón de registro
  const handleRegistroClick = (event) => {
    event.preventDefault(); // Evita el envío automático del formulario

    // Validaciones de los campos
    const newErrors = {};

    if (!formData.nombre) {
      newErrors.nombre = "El nombre es obligatorio.";
    }
    if (!formData.apellido) {
      newErrors.apellido = "El apellido es obligatorio.";
    }
    if (!formData.email) {
      newErrors.email = "El email es obligatorio.";
    }
    if (!formData.contrasena) {
      newErrors.contrasena = "La contraseña es obligatoria.";
    }
    if (!formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "Confirmar contraseña es obligatorio.";
    } else if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "Las contraseñas no coinciden.";
    }

    // Si hay errores, no redirigir y mostrar errores
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Si no hay errores, redirigir a la página de login
      setErrors({});
      navigate("/login");
    }
  };

  return (
    <div className="registro-containerPadre">
      <div className="registro-container">
        <h2>-----Registro-----</h2>
        <p>Esto solo tomará unos minutos</p>
        <form>
          <div className="form-control">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          </div>
          <div className="form-control">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleInputChange}
            />
            {errors.apellido && <span className="error-message">{errors.apellido}</span>}
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-control">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              placeholder="Contraseña"
              value={formData.contrasena}
              onChange={handleInputChange}
            />
            {errors.contrasena && <span className="error-message">{errors.contrasena}</span>}
          </div>
          <div className="form-control">
            <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmarContrasena"
              placeholder="Confirmar Contraseña"
              value={formData.confirmarContrasena}
              onChange={handleInputChange}
            />
            {errors.confirmarContrasena && (
              <span className="error-message">{errors.confirmarContrasena}</span>
            )}
          </div>
          <Button
            className={"boton-registrar"}
            title={"Registrar"}
            onClick={handleRegistroClick} // Añade el evento onClick
          />
        </form>
      </div>
    </div>
  );
};
