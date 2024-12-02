import React, { useState, useEffect } from "react";
import {
  updateReserva,
  deleteReserva,
  getAllReservas,
  actualizarReservas,
} from "../../services/ReservaService";
import "./MainContentReservas.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const MainContentReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    loadReservas();
  }, []);

  const loadReservas = async () => {
    try {
      const response = await getAllReservas();
      setReservas(response.data);
    } catch (error) {
      console.error("Error cargando todas las reservas:", error);
    }
  };

  const handleActualizarEstados = async () => {
    try {
      await actualizarReservas();
      loadReservas();
    } catch (error) {
      console.error("Error actualizando estados de reservas:", error);
    }
  };

  const handleConfirmarReserva = async (reserva) => {
    try {
      const updatedReserva = { ...reserva, estadoReserva: "CONFIRMADA" };
      await updateReserva(reserva.reservaId, updatedReserva);
      loadReservas();
    } catch (error) {
      console.error("Error confirmando la reserva:", error);
    }
  };

  const handleCancelarReserva = async (reservaId) => {
    try {
      await deleteReserva(reservaId);
      loadReservas();
    } catch (error) {
      console.error("Error cancelando la reserva:", error);
    }
  };

  const handleTerminarReserva = async (reserva) => {
    try {
      const updatedReserva = { ...reserva, estadoReserva: "TERMINADA" };
      await updateReserva(reserva.reservaId, updatedReserva);
      loadReservas();
    } catch (error) {
      console.error("Error terminando la reserva:", error);
    }
  };

  return (
    <div className="reservas-container col py-3">
      <div className="box1-header">
        <i className="fa-solid fa-bars fa-2x"></i>
        <h1>RESERVAS</h1>
      </div>
      <div className="adminR-container mt-5 px-4">
        <div className="adminR-actions d-flex justify-content-between align-items-center mb-4">
          <h2 className="adminR-title fw-bold text-primary">
            Gestión de Reservas
          </h2>
          <button
            className="btn btn-outline-danger px-4 py-2 rounded-pill shadow-sm"
            onClick={handleActualizarEstados}
          >
            Cancelar Reservas Pasadas
          </button>
        </div>
        <div className="table-responsive rounded shadow-sm">
          <table className="table table-bordered table-striped adminR-reservas-table">
            <thead className="table-primary">
              <tr>
                <th>Fecha</th>
                <th>Estado</th>
                <th>ID Cliente</th>
                <th>ID Box</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Capacidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.reservaId} className="align-middle">
                  <td>{reserva.fechaReserva}</td>
                  <td
                    className={`fw-bold ${
                      reserva.estadoReserva === "PENDIENTE"
                        ? "text-warning"
                        : reserva.estadoReserva === "CONFIRMADA"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {reserva.estadoReserva}
                  </td>
                  <td>{reserva.clientId}</td>
                  <td>{reserva.boxId}</td>
                  <td>{reserva.primerNombre}</td>
                  <td>{reserva.primerApellido}</td>
                  <td>{reserva.email}</td>
                  <td>{reserva.telefono}</td>
                  <td>{reserva.boxCapacidad}</td>
                  <td>
                    <div className="d-flex flex-column">
                      <button
                        className="btn btn-warning btn-sm mb-2 adminR-confirm-button fw-bold"
                        onClick={() => handleConfirmarReserva(reserva)}
                        disabled={reserva.estadoReserva !== "PENDIENTE"}
                      >
                        Confirmar
                      </button>
                      <button
                        className="btn btn-danger btn-sm mb-2 adminR-cancel-button fw-bold"
                        onClick={() => handleCancelarReserva(reserva.reservaId)}
                        disabled={reserva.estadoReserva !== "PENDIENTE"}
                      >
                        Cancelar
                      </button>
                      <button
                        className="btn btn-success btn-sm adminR-finish-button fw-bold"
                        onClick={() => handleTerminarReserva(reserva)}
                        disabled={reserva.estadoReserva !== "CONFIRMADA"}
                      >
                        Terminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
