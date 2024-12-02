import React, { useState, useEffect } from "react";
import {
  getAllHistorialReservas,
  filterHistorialByClientId,
  filterHistorialByReservaId,
  filterHistorialByFechaReserva,
  filterHistorialByEstadoReserva,
} from "../../services/HistorialReservaServices";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MainContentHistorialReservas.css";

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
      alert("Hubo un error al cargar los datos del historial. Inténtalo más tarde.");
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
        response = await filterHistorialByFechaReserva(filters.fechaReserva);
      } else if (filters.estadoReserva) {
        response = await filterHistorialByEstadoReserva(filters.estadoReserva);
      } else {
        response = await getAllHistorialReservas();
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
    <div className="col py-3">
      <div className="hr-content">
        <div className="hr-card-container">
          <div className="hr-card shadow-sm">
            <div className="box1-header">
              <i className="bi bi-journal-text me-2 fa-2x"></i>
              <h1> ADMINISTRACION HISTORIALES</h1>
            </div>
            <div className="hr-card-body">
              <div className="hr-title mb-4">
                <h5 className="text-success">
                  <i className="bi bi-filter-circle"></i> Historial de Reservas
                </h5>
              </div>
              <div className="hr-filters row g-3 mb-4 align-items-center">
                <div className="col-md-3">
                  <label
                    htmlFor="clientId"
                    className="form-label hr-filter-label"
                  >
                    Buscar DNI Cliente
                  </label>
                  <input
                    id="clientId"
                    type="text"
                    className="form-control hr-filter-input"
                    placeholder="Ejemplo: 12345678"
                    value={filters.clientId}
                    onChange={(e) =>
                      setFilters({ ...filters, clientId: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label
                    htmlFor="reservaId"
                    className="form-label hr-filter-label"
                  >
                    Buscar por Reserva ID
                  </label>
                  <input
                    id="reservaId"
                    type="text"
                    className="form-control hr-filter-input"
                    placeholder="Ejemplo: 123"
                    value={filters.reservaId}
                    onChange={(e) =>
                      setFilters({ ...filters, reservaId: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label
                    htmlFor="fechaReserva"
                    className="form-label hr-filter-label"
                  >
                    Fecha de Reserva
                  </label>
                  <input
                    id="fechaReserva"
                    type="date"
                    className="form-control hr-filter-input"
                    value={filters.fechaReserva}
                    onChange={(e) =>
                      setFilters({ ...filters, fechaReserva: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label
                    htmlFor="estadoReserva"
                    className="form-label hr-filter-label"
                  >
                    Estado
                  </label>
                  <select
                    id="estadoReserva"
                    className="form-select hr-filter-select"
                    value={filters.estadoReserva}
                    onChange={(e) =>
                      setFilters({ ...filters, estadoReserva: e.target.value })
                    }
                  >
                    <option value="">Seleccionar Estado</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="CONFIRMADA">CONFIRMADA</option>
                    <option value="CANCELADA">CANCELADA</option>
                    <option value="TERMINADA">TERMINADA</option>
                    <option value="DISPONIBLE">DISPONIBLE</option>
                  </select>
                </div>
              </div>

              <div className="hr-buttons d-flex justify-content-between">
                <button className="btn btn-success" onClick={applyFilters}>
                  Filtrar
                </button>
                <button className="btn btn-secondary" onClick={clearFilters}>
                  Limpiar Filtros
                </button>
              </div>
              <div className="hr-table-responsive table-responsive mt-4">
                <table className="table table-striped table-hover">
                  <thead className="table-success">
                    <tr>
                      <th>ID Historial</th>
                      <th>ID Reserva</th>
                      <th>Fecha del Cambio</th>
                      <th>Fecha de la Reserva</th>
                      <th>ID Cliente</th>
                      <th>Estado Final</th>
                    </tr>
                  </thead>
                  <tbody className="table-itemshr">
                    {historialData.map((historial) => (
                      <tr key={historial.historialId}>
                        <td>{historial.historialId}</td>
                        <td>{historial.reservaId}</td>
                        <td>{historial.fechaCambio}</td>
                        <td>{historial.fechaReserva}</td>
                        <td>{historial.clientId}</td>
                        <td>{historial.estadoFinal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
