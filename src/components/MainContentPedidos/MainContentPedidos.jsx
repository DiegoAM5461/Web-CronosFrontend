import React, { useState, useEffect } from "react";
import {
  getOrdersByStatuses,
  completeOrder,
  confirmOrder,
} from "../../services/OrdersService";
import {
  getOrdersDetailsByBoxAndOrder,
  getOrdersDetailsByTableAndOrder,
  updateProductQuantityInOrder,
} from "../../services/OrdersDetailsService";
import "./MainContentPedidos.css";

export const MainContentPedidos = ({ estados }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); // Estado para los mensajes

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getOrdersByStatuses(estados);
        const filteredOrders = response.data.filter(
          (order) =>
            order.ordersEstado === "PENDIENTE" || order.ordersEstado === "CONFIRMADO"
        );

        const detailedOrders = await Promise.all(
          filteredOrders.map(async (order) => {
            let ordersDetails = [];
            if (order.boxId) {
              const boxDetailsResponse = await getOrdersDetailsByBoxAndOrder(
                order.boxId,
                order.ordersId
              );
              ordersDetails = boxDetailsResponse.data?.ordersDetails || [];
            } else if (order.tableCronosId) {
              const tableDetailsResponse = await getOrdersDetailsByTableAndOrder(
                order.tableCronosId,
                order.ordersId
              );
              ordersDetails = tableDetailsResponse.data?.ordersDetails || [];
            }
            return { ...order, ordersDetails };
          })
        );

        setOrders(detailedOrders);
        setError(null);
      } catch (err) {
        setError("No se encuentran pedidos PENDIENTES NI CONFIRMADOS.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [estados]);

  const handleConfirmOrder = async (orderId) => {
    try {
      await confirmOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.ordersId === orderId
            ? { ...order, ordersEstado: "CONFIRMADO" }
            : order
        )
      );
      setMessage("Pedido confirmado con éxito");
    } catch (error) {
      console.error("Error confirming order:", error);
      setMessage("Error al confirmar el pedido.");
    } finally {
      setTimeout(() => setMessage(""), 3000); // Limpia el mensaje después de 3 segundos
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      await completeOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.ordersId !== orderId)
      );
      setMessage("Pedido completado con éxito");
    } catch (error) {
      console.error("Error completing order:", error);
      setMessage("Error al completar el pedido.");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleConfirmProduct = async (detail) => {
    try {
      await updateProductQuantityInOrder(detail.ordersDetailsId, {
        estado: "CONFIRMADO",
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.ordersId === detail.ordersId
            ? {
                ...order,
                ordersDetails: order.ordersDetails.map((d) =>
                  d.ordersDetailsId === detail.ordersDetailsId
                    ? { ...d, estado: "CONFIRMADO" }
                    : d
                ),
              }
            : order
        )
      );
      setMessage("Producto confirmado con éxito");
    } catch (error) {
      console.error("Error al confirmar el producto:", error);
      setMessage("Error al confirmar el producto.");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) {
    return <p>Cargando pedidos...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="col py-3">
        <p>No hay pedidos para los estados {estados.join(", ")}.</p>
      </div>
    );
  }

  return (
    <div className="col py-3">
      <div className="pedidoC-container">
        <div className="pedidoC-header d-flex align-items-center">
          <i className="fa-solid fa-bars fa-2x me-2"></i>
          <h1>Pedidos en estados: {estados.join(", ")}</h1>
        </div>

        {message && <p className="text-success text-center">{message}</p>} {/* Mensaje visual */}

        {orders.map((order) => {
          // Calcular el total del pedido
          const totalOrder = order.ordersDetails.reduce(
            (total, detail) => total + detail.price * detail.quantity,
            0
          );

          return (
            <div
              key={`order-${order.ordersId}`}
              className="pedidoC-content bg-white text-dark p-4 rounded shadow"
            >
              <div className="pedidoC-control-header bg-success text-white p-2 rounded mb-3">
                <span>&#x1F527;</span>{" "}
                {order.boxId
                  ? `Box ${order.boxId}`
                  : `Mesa ${order.tableCronosId}`}{" "}
                - {order.ordersEstado}
              </div>

              <div className="pedidoC-table mt-3">
                <div className="border rounded p-3">
                  <table className="table table-hover table-striped">
                    <thead className="table-light text-center">
                      <tr>
                        <th className="text-success">Nombre</th>
                        <th className="text-success">Imagen</th>
                        <th className="text-success">Precio</th>
                        <th className="text-success">Cantidad</th>
                        <th className="text-success">Subtotal</th>
                        <th className="text-success">Estado</th>
                        <th className="text-success">Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.ordersDetails.map((detail) => (
                        <tr
                          key={`detail-${detail.ordersDetailsId}`}
                          className="text-center"
                        >
                          <td>{detail.productName}</td>
                          <td>
                            <img
                              src={detail.productImage}
                              alt="Producto"
                              className="img-thumbnail"
                              style={{ width: "50px", height: "50px" }}
                            />
                          </td>
                          <td>{detail.price}</td>
                          <td>{detail.quantity}</td>
                          <td>{(detail.price * detail.quantity).toFixed(2)}</td>
                          <td>{detail.estado}</td>
                          <td>
                            <button
                              className="btn btn-outline-success btn-sm"
                              disabled={detail.estado !== "PENDIENTE"}
                              onClick={() => handleConfirmProduct(detail)}
                            >
                              Confirmar Producto
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mostrar el total del pedido */}
              <div className="pedidoC-total mt-3 text-end">
                <h5>Total: {totalOrder.toFixed(2)}</h5>
              </div>

              <div className="pedidoC-action mt-3 text-end">
                <button
                  className="btn btn-primary pedidoC-confirm-button"
                  onClick={() => handleConfirmOrder(order.ordersId)}
                  disabled={order.ordersEstado !== "PENDIENTE"}
                >
                  CONFIRMAR PEDIDO
                </button>
              </div>

              <div className="pedidoC-action mt-3 text-end">
                <button
                  className="btn btn-success pedidoC-complete-button"
                  onClick={() => handleCompleteOrder(order.ordersId)}
                  disabled={order.ordersEstado !== "CONFIRMADO"}
                >
                  COMPLETAR PEDIDO
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
