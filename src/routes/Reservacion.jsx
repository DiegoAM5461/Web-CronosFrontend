import React, { useState, useEffect } from "react";
import "./Pages-Css/Reservaciones.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ButtonC/Button";
import { NavLink } from "react-router-dom";
import {
  createReserva,
  getBoxes,
  getClientById,
  createClient,
} from "../services/ReservaService";

export const Reservacion = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clientId: "",
    primerNombre: "",
    apellidoPaterno: "",
    email: "",
    telefono: "",
    opciones: "",
    fechaReserva: "",
    horaInicio: "22:00",
    horaFin: "06:00",
  });

  const [errors, setErrors] = useState({});
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    getBoxes()
      .then((response) => {
        setBoxes(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los boxes:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRegistroClick = (event) => {
    event.preventDefault();

    // Validaciones de los campos
    const newErrors = {};
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
    const telefonoPattern = /^[0-9]{9}$/;
    const today = new Date().toISOString().split("T")[0];

    if (!formData.clientId) {
      newErrors.clientId = "El ID del cliente es obligatorio.";
    }
    if (!formData.primerNombre) {
      newErrors.primerNombre = "El primer nombre es obligatorio.";
    }
    if (!formData.apellidoPaterno) {
      newErrors.apellidoPaterno = "El apellido paterno es obligatorio.";
    }
    if (!formData.email) {
      newErrors.email = "El email es obligatorio.";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email =
        "El email debe ser un correo válido de Gmail, Hotmail o Outlook.";
    }
    if (!formData.telefono) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!telefonoPattern.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener 9 dígitos.";
    }
    if (!formData.opciones) {
      newErrors.opciones = "Debe seleccionar un Box.";
    } else {
      const boxSeleccionado = boxes.find(
        (box) => box.boxId === parseInt(formData.opciones)
      );
      if (boxSeleccionado) {
        if (boxSeleccionado.boxEstado === "1") {
          newErrors.opciones =
            "El Box seleccionado está actualmente reservado. Por favor seleccione otro Box.";
        } else if (boxSeleccionado.boxEstado === "2") {
          newErrors.opciones =
            "El Box seleccionado está actualmente ocupado. Por favor seleccione otro Box.";
        }
      }
    }
    if (!formData.fechaReserva) {
      newErrors.fechaReserva = "La fecha de reserva es obligatoria.";
    } else if (formData.fechaReserva < today) {
      newErrors.fechaReserva =
        "La fecha de reserva no puede ser anterior a la fecha actual.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Verificar si el cliente ya existe
      getClientById(formData.clientId)
        .then((response) => {
          // Si el cliente existe, procede con la creación de la reserva
          console.log("Cliente encontrado:", response.data);
          crearReserva();
        })
        .catch((error) => {
          // Si el cliente no existe, lo crea primero antes de crear la reserva
          if (error.response && error.response.status === 404) {
            console.log("Cliente no encontrado, creando un nuevo cliente...");

            const clientData = {
              clientId: formData.clientId,
              primerNombre: formData.primerNombre,
              primerApellido: formData.apellidoPaterno,
              email: formData.email,
              telefono: formData.telefono,
            };

            createClient(clientData)
              .then((response) => {
                console.log("Cliente creado con éxito:", response.data);
                crearReserva(); // Llama a la función para crear la reserva después de crear el cliente
              })
              .catch((err) => {
                console.error("Error al crear el cliente:", err);
                setErrors({
                  general:
                    "Hubo un error al crear el cliente. Intente nuevamente más tarde.",
                });
              });
          } else {
            console.error("Error al verificar el cliente:", error);
            setErrors({
              general:
                "Hubo un error al verificar el cliente. Intente nuevamente más tarde.",
            });
          }
        });
    }
  };

  const crearReserva = () => {
    const reservaData = {
      clientId: formData.clientId,
      primerNombre: formData.primerNombre,
      primerApellido: formData.apellidoPaterno,
      email: formData.email,
      telefono: formData.telefono,
      boxId: parseInt(formData.opciones),
      fechaReserva: formData.fechaReserva,
      horaInicio: formData.horaInicio,
      horaFin: formData.horaFin,
      estadoReserva: "pendiente",
    };

    createReserva(reservaData)
      .then((response) => {
        console.log("Reserva creada con éxito", response.data);
        navigate("/"); // Redirige si la reserva fue exitosa
      })
      .catch((error) => {
        console.error(
          "Hubo un error al crear la reserva:",
          error.response ? error.response.data.message : error.message
        );
        setErrors({
          general:
            "Hubo un error al crear la reserva. Intente nuevamente más tarde.",
        });
      });
  };

  return (
    <>
      <div className="reservacion-containerPadre">
        <div className="reservacion-container">
          <NavLink className="reservacion-inicio" to="/">
            X
          </NavLink>
          <h2>Reserva tu Box </h2>
          <form>
            <div className="reservacion-form-control">
              <input
                type="text"
                id="clientId"
                placeholder="Dni"
                value={formData.clientId}
                onChange={handleInputChange}
              />
              {errors.clientId && (
                <span className="reservacion-error-message">
                  {errors.clientId}
                </span>
              )}
            </div>
            <div className="reservacion-form-control">
              <input
                type="text"
                id="primerNombre"
                placeholder="Primer Nombre"
                value={formData.primerNombre}
                onChange={handleInputChange}
              />
              {errors.primerNombre && (
                <span className="reservacion-error-message">
                  {errors.primerNombre}
                </span>
              )}
            </div>
            <div className="reservacion-form-control">
              <input
                type="text"
                id="apellidoPaterno"
                placeholder="Apellido Paterno"
                value={formData.apellidoPaterno}
                onChange={handleInputChange}
              />
              {errors.apellidoPaterno && (
                <span className="reservacion-error-message">
                  {errors.apellidoPaterno}
                </span>
              )}
            </div>
            <div className="reservacion-form-control">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <span className="reservacion-error-message">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="reservacion-form-control">
              <input
                type="text"
                id="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
              {errors.telefono && (
                <span className="reservacion-error-message">
                  {errors.telefono}
                </span>
              )}
            </div>
            <div className="reservacion-form-control">
              <label htmlFor="fechaReserva">Fecha de Reserva</label>
              <input
                type="date"
                id="fechaReserva"
                placeholder="Fecha de Reserva"
                value={formData.fechaReserva}
                onChange={handleInputChange}
              />
              {errors.fechaReserva && (
                <span className="reservacion-error-message">
                  {errors.fechaReserva}
                </span>
              )}
            </div>
            <div className="reservacion-form-control">
              <label htmlFor="opciones">Seleccione su Box</label>
              <select
                id="opciones"
                onChange={handleInputChange}
                value={formData.opciones}
              >
                <option value="">Seleccione una opción</option>
                {boxes.map((box) => (
                  <option key={box.boxId} value={box.boxId}>
                    {`Box ${box.boxNumero} - Capacidad: ${
                      box.boxCapacidad
                    } - Estado: ${
                      box.boxEstado === "3"
                        ? "Disponible"
                        : box.boxEstado === "1"
                        ? "Reservado"
                        : "Ocupado"
                    }`}
                  </option>
                ))}
              </select>
              {errors.opciones && (
                <span className="reservacion-error-message">
                  {errors.opciones}
                </span>
              )}
            </div>
            <Button
              className={"reservacion-boton-reservacion"}
              title={"Reservar!!!"}
              onClick={handleRegistroClick}
            />
          </form>
        </div>
      </div>
    </>
  );
};
