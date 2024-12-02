import React, { useState, useEffect } from "react";
import { getOrdersByStatuses } from "../../services/OrdersService";
import { useNavigate } from "react-router-dom";
import "./MainContentMesas.css";

export const MainContentMesas = () => {
  const [tablesAndBoxes, setTablesAndBoxes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPendingOrders();
  }, []);

  const loadPendingOrders = async () => {
    try {
      const response = await getOrdersByStatuses(["PENDIENTE"]);
      const pendingItems = response.data;

      const allItems = [
        ...Array(6)
          .fill(null)
          .map((_, index) => ({
            type: "box",
            id: index + 1,
            estado: pendingItems.find((item) => item.boxId === index + 1)
              ? "PENDIENTE"
              : null,
          })),
        ...Array(3)
          .fill(null)
          .map((_, index) => ({
            type: "table",
            id: index + 1,
            estado: pendingItems.find(
              (item) => item.tableCronosId === index + 1
            )
              ? "PENDIENTE"
              : null,
          })),
      ];

      setTablesAndBoxes(allItems);
    } catch (error) {
      console.error("Error al cargar pedidos pendientes:", error);
    }
  };

  const handleClick = (item) => {
    if (item.estado === "PENDIENTE") {
      navigate(`/administracion/pedido/${item.id}`, { state: { type: item.type } });
    }
  };

  return (
    <div className="adminMesas-container col py-3">
      <div className="box1-header">
        <i className="fa-solid fa-bars fa-2x"></i>
        <h1> MESAS Y BOXES</h1>
      </div>

      <div className="row g-4">
        {tablesAndBoxes.map((item, index) => (
          <div
            key={index}
            className={`col-12 col-sm-6 col-md-4 adminMesas-item ${
              item.estado === "PENDIENTE"
                ? "adminMesas-pending"
                : "adminMesas-default"
            }`}
            onClick={() => handleClick(item)}
            style={{ cursor: item.estado === "PENDIENTE" ? "pointer" : "default" }}
          >
            <div className="adminMesas-card p-3 rounded shadow-sm text-center">
              <img
                src={
                  item.type === "box"
                    ? "https://i.pinimg.com/originals/5b/75/5f/5b755f0f227575a033a4b104d183e360.jpg"
                    : "https://static.vecteezy.com/system/resources/previews/001/830/887/non_2x/restaurant-table-with-food-and-wine-bottle-cups-isolated-design-icon-white-background-free-vector.jpg"
                }
                alt={item.type === "box" ? `Box ${item.id}` : `Mesa ${item.id}`}
                className="img-fluid rounded mb-2 adminMesas-img"
              />
              <div className="fw-bold text-secondary">
                {item.type === "box" ? `Box ${item.id}` : `Mesa ${item.id}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
