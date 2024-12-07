import React, { useState } from "react";
import {
  getHistorialOrdersByDateRange,
  exportDetailedOrdersToExcel,
  exportDailyOrdersToExcel,
} from "../../services/HistorialOrdersService";
import "./MainContentHistorialPedidos.css";

export const MainContentHistorialPedidos = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    if (!startDate || !endDate) {
      setError("Por favor selecciona un rango de fechas válido.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await getHistorialOrdersByDateRange(startDate, endDate);
      setOrders(data);
    } catch (err) {
      setError(
        "Hubo un error al obtener los datos. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExportDetailed = async () => {
    try {
      await exportDetailedOrdersToExcel(startDate, endDate);
    } catch (error) {
      setError("Error al exportar órdenes detalladas a Excel.");
    }
  };

  const handleExportDaily = async () => {
    try {
      await exportDailyOrdersToExcel(startDate, endDate);
    } catch (error) {
      setError("Error al exportar análisis diario a Excel.");
    }
  };

  return (
    <div className="col py-3">
      <div className="box1-header">
        <i className="fa-solid fa-bars fa-2x"></i>
        <h1> HISTORIAL DE PEDIDOS </h1>
      </div>
      <div className="mchistorialp-container">
        <div className="mchistorialp-filters">
          <label>
            Fecha de Inicio:
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            Fecha de Fin:
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <button onClick={fetchOrders} disabled={loading}>
            {loading ? "Cargando..." : "Buscar"}
          </button>
          <button onClick={handleExportDetailed} disabled={!startDate || !endDate}>
            Exportar Órdenes Detalladas
          </button>
          <button onClick={handleExportDaily} disabled={!startDate || !endDate}>
            Exportar Análisis Diario
          </button>
        </div>
        {error && <p className="mchistorialp-error">{error}</p>}
        {loading && <p className="mchistorialp-loading">Cargando datos...</p>}
        {orders.length > 0 ? (
          <div className="mchistorialp-orders">
            {orders.map((order) => (
              <div
                key={order.historialOrdersId}
                className="mchistorialp-order-card"
              >
                <h3>Pedido #{order.orders.ordersId}</h3>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(order.fechaCreacion).toLocaleString()}
                </p>
                <p>
                  <strong>Estado:</strong> {order.orders.ordersEstado}
                </p>
                <p>
                  <strong>Total:</strong> S/
                  {order.orders.ordersTotal.toFixed(2)}
                </p>
                <p>
                  <strong>Ubicación:</strong>{" "}
                  {order.orders.boxId
                    ? `Box #${order.orders.boxId}`
                    : `Mesa #${order.orders.tableCronosId || "N/A"}`}
                </p>
                <div className="mchistorialp-products">
                  <h4>Productos:</h4>
                  <ul>
                    {order.orders.details.map((detail) => (
                      <li key={detail.ordersDetailsId}>
                        <img
                          src={detail.productImage}
                          alt={detail.productName}
                        />
                        <span>
                          {detail.productName} - Cantidad: {detail.quantity},
                          Subtotal: S/{detail.subtotal.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="mchistorialp-no-data">No hay datos para mostrar.</p>
          )
        )}
      </div>
    </div>
  );
};
