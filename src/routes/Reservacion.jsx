import React, { useState, useEffect } from "react";
import "./Pages-Css/Reservaciones.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ButtonC/Button";
import { NavLink } from "react-router-dom";
import {
  createReserva,
  getAvailableReservations,
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
    fechaReserva: "",
    horaInicio: "22:00",
    horaFin: "06:00",
    boxId: "",
  });

  const [errors, setErrors] = useState({});
  const [reservasDisponibles, setReservasDisponibles] = useState([]);

  // Actualiza la lista de boxes disponibles cuando se selecciona una fecha
  useEffect(() => {
    console.log("Fecha seleccionada:", formData.fechaReserva);
    if (formData.fechaReserva) {
      getAvailableReservations(formData.fechaReserva)
        .then((response) => {
          console.log("Reservas disponibles:", response.data);
          setReservasDisponibles(response.data); // Guardamos las reservas disponibles
        })
        .catch((error) => {
          console.error("Error al obtener las reservas disponibles:", error);
        });
    }
  }, [formData.fechaReserva]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Validación específica para clientId y teléfono
    if (id === "clientId" && !/^\d{0,8}$/.test(value)) return;
    if (id === "telefono" && !/^\d{0,9}$/.test(value)) return;

    setFormData({ ...formData, [id]: value });
  };

  const handleBoxSelectionClick = (event) => {
    event.preventDefault();
    checkAndCreateClient();
  };

  const checkAndCreateClient = () => {
    getClientById(formData.clientId)
      .then(() => {
        crearReserva();
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Aquí se intenta crear un nuevo cliente si no se encuentra
          const clientData = {
            clientId: formData.clientId,
            primerNombre: formData.primerNombre,
            primerApellido: formData.apellidoPaterno,
            email: formData.email,
            telefono: formData.telefono,
          };
          createClient(clientData)
            .then(() => {
              crearReserva();
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
  };

  const crearReserva = () => {
    const reservaData = {
      clientId: formData.clientId,
      primerNombre: formData.primerNombre,
      primerApellido: formData.apellidoPaterno,
      email: formData.email,
      telefono: formData.telefono,
      boxId: parseInt(formData.boxId),
      fechaReserva: formData.fechaReserva,
      horaInicio: formData.horaInicio,
      horaFin: formData.horaFin,
      estadoReserva: "PENDIENTE",
    };

    createReserva(reservaData)
      .then(() => {
        console.log("Reserva creada con éxito");
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => {
        console.error("Error al crear la reserva:", error);
        setErrors({
          general:
            "Hubo un error al crear la reserva. Intente nuevamente más tarde.",
        });
      });
  };

  return (
    <div className="reservacion-containerPadre">
      <div className="reservacion-container">
        <NavLink className="reservacion-inicio" to="/">
          X
        </NavLink>
        <h2>Reserva tu Box</h2>
        <form>
          <div className="reservacion-form-control">
            <input
              type="text"
              id="clientId"
              placeholder="DNI"
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
              <span className="reservacion-error-message">{errors.email}</span>
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
              min={new Date().toISOString().split("T")[0]} // Fecha mínima para hoy
              value={formData.fechaReserva}
              onChange={handleInputChange}
            />
            {errors.fechaReserva && (
              <span className="reservacion-error-message">
                {errors.fechaReserva}
              </span>
            )}
          </div>
        </form>

        {reservasDisponibles.length > 0 && (
          <form>
            <div className="reservacion-form-control">
              <label htmlFor="boxId">Seleccione su Box</label>
              <select
                id="boxId"
                onChange={handleInputChange}
                value={formData.boxId}
              >
                <option value="">Seleccione una opción</option>
                {reservasDisponibles.map((box) => (
                  <option key={box.boxId} value={box.boxId}>
                    {`Box ${box.boxId} - Capacidad: ${box.boxCapacidad}`}
                  </option>
                ))}
              </select>

              {errors.boxId && (
                <span className="reservacion-error-message">
                  {errors.boxId}
                </span>
              )}
            </div>
            <Button
              className={"reservacion-boton-reservacion"}
              title={"Reservar!!!"}
              onClick={handleBoxSelectionClick}
            />
          </form>
        )}
      </div>
    </div>
  );
};
