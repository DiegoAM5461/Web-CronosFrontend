// src/components/MainContentHistorialReservas/MainContentHistorialReservas.jsx
import React, { useState, useEffect } from "react";
import { getAllHistorialReservas, filterHistorialByClientId, filterHistorialByReservaId, filterHistorialByFechaReserva, filterHistorialByEstadoReserva } from "../../services/HistorialReservaServices";
import "./MainContentHistorialReservas.css";
import { Button } from "../ButtonC/Button";

export const MainContentHistorialReservas = () => {
  const [historialData, setHistorialData] = useState([]);
  const [filters, setFilters] = useState({
    clientId: "",
    reservaId: "",
    fechaReserva: "",
    estadoReserva: "",
  });

  useEffect(() => {
    fetchAllHistorial();
  }, []);

  const fetchAllHistorial = async () => {
    try {
      const response = await getAllHistorialReservas();
      setHistorialData(response.data);
    } catch (error) {
      console.error("Error fetching historial data:", error);
    }
  };

  const applyFilters = async () => {
    try {
      let response;
      if (filters.clientId) {
        response = await filterHistorialByClientId(filters.clientId);
      } else if (filters.reservaId) {
        response = await filterHistorialByReservaId(filters.reservaId);
      } else if (filters.fechaReserva) {
        console.log("Fecha enviada:", filters.fechaReserva); // Verifica el formato aquí
        response = await filterHistorialByFechaReserva(filters.fechaReserva);
      } else if (filters.estadoReserva) {
        response = await filterHistorialByEstadoReserva(filters.estadoReserva);
      } else {
        response = await getAllHistorialReservas(); // Fetch all if no filters are applied
      }
      setHistorialData(response.data);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const clearFilters = () => {
    setFilters({
      clientId: "",
      reservaId: "",
      fechaReserva: "",
      estadoReserva: "",
    });
    fetchAllHistorial();
  };

  return (
    <>
      <div className="box1reservas-header">
        <div className="menu-icon">&#9776;</div>
        <div className="header-title">GESTIÓN DE RESERVAS</div>
      </div>
      <div className="box2reservas-content">
        <div className="control-header">
          <span>&#x1F527;</span> Historial de reservas
        </div>

        <div className="search-filter">
          <div className="barrabusqueda">
            <input
              type="text"
              placeholder="Buscar DNI Cliente"
              className="search-input"
              value={filters.clientId}
              onChange={(e) => setFilters({ ...filters, clientId: e.target.value })}
            />
          </div>

          <div className="barrabusqueda">
            <input
              type="text"
              placeholder="Buscar por Reserva ID"
              className="search-input"
              value={filters.reservaId}
              onChange={(e) => setFilters({ ...filters, reservaId: e.target.value })}
            />
          </div>

          <div className="barrabusqueda">
            <input
              type="date"
              className="search-input"
              value={filters.fechaReserva}
              onChange={(e) => setFilters({ ...filters, fechaReserva: e.target.value })}
            />
          </div>

          <div className="opciones-estado">
            <select
              className="estado-select"
              value={filters.estadoReserva}
              onChange={(e) => setFilters({ ...filters, estadoReserva: e.target.value })}
            >
              <option value="">Estado</option>
              <option value="PENDIENTE">PENDIENTE</option>
              <option value="CONFIRMADA">CONFIRMADA</option>
              <option value="CANCELADA">CANCELADA</option>
              <option value="TERMINADA">TERMINADA</option>
              <option value="DISPONIBLE">DISPONIBLE</option>
            </select>
          </div>
          <div className="button-filteryclean">
            <Button title={"Filtrar"} className={"botonbusqueda"} onClick={applyFilters} />
            <Button title={"Limpiar Filtros"} className={"botonbusqueda"} onClick={clearFilters} />
          </div>
          
        </div>

        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>ID Historial</th>
                <th>Fecha del Cambio</th>
                <th>Hora del Cambio</th>
                <th>ID Reserva</th>
                <th>ID Cliente</th>
                <th>Estado Final</th>
              </tr>
            </thead>
            <tbody>
              {historialData.map((historial) => (
                <tr key={historial.historialId}>
                  <td>{historial.historialId}</td>
                  <td>{historial.fechaCambio}</td>
                  <td>{historial.horaCambio}</td>
                  <td>{historial.reservaId}</td>
                  <td>{historial.clientId}</td>
                  <td>{historial.estadoFinal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
