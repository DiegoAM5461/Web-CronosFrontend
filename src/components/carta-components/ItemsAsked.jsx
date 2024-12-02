import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  updateProductQuantityInOrder,
  deleteOrdersDetails,
} from "../../services/OrdersDetailsService";
import { getOrdersByBox, getOrdersByTable } from "../../services/OrdersService";
import "./CartaComponent.css";
//Checkpoint 1
export const ItemsAsked = ({ ordersId, refreshCart, clearOrder }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [searchParams] = useSearchParams();
  const boxId = searchParams.get("boxId");
  const tableCronosId = searchParams.get("tableCronosId");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        let response;
        if (boxId) {
          response = await getOrdersByBox(boxId);
        } else if (tableCronosId) {
          response = await getOrdersByTable(tableCronosId);
        } else {
          console.error("No se encontró boxId ni tableCronosId en la URL");
          return;
        }

        // Filtrar por estados permitidos en el frontend
        const estadosPermitidos = ["PENDIENTE", "CONFIRMADO"];
        const mappedDetails = response.data
          .filter((order) => estadosPermitidos.includes(order.ordersEstado))
          .flatMap((order) =>
            order.ordersDetails.map((detail) => ({
              ordersDetailsId: detail.ordersDetailsId,
              ordersId: order.ordersId,
              productImage:
                detail.productImage || "https://via.placeholder.com/60",
              productName: detail.productName,
              quantity: detail.quantity,
              price: detail.price,
              subtotal: detail.subtotal,
            }))
          );

        setOrderDetails(mappedDetails);
      } catch (error) {
        console.error("Error al obtener detalles del pedido:", error);
      }
    };

    fetchOrderDetails();
  }, [boxId, tableCronosId]);

  const handleIncrement = async (item) => {
    try {
      await updateProductQuantityInOrder(item.ordersDetailsId, {
        quantity: item.quantity + 1,
      });

      // Actualiza localmente mientras `refreshCart` sincroniza.
      setOrderDetails((prev) =>
        prev.map((detail) =>
          detail.ordersDetailsId === item.ordersDetailsId
            ? {
                ...detail,
                quantity: detail.quantity + 1,
                subtotal: (detail.quantity + 1) * detail.price,
              }
            : detail
        )
      );

      refreshCart();
    } catch (error) {
      console.error("Error al incrementar la cantidad:", error);
    }
  };

  const handleDecrement = async (item) => {
    if (item.quantity > 1) {
      try {
        await updateProductQuantityInOrder(item.ordersDetailsId, {
          quantity: item.quantity - 1,
        });

        // Actualiza localmente mientras `refreshCart` sincroniza.
        setOrderDetails((prev) =>
          prev.map((detail) =>
            detail.ordersDetailsId === item.ordersDetailsId
              ? {
                  ...detail,
                  quantity: detail.quantity - 1,
                  subtotal: (detail.quantity - 1) * detail.price,
                }
              : detail
          )
        );

        refreshCart();
      } catch (error) {
        console.error("Error al disminuir la cantidad:", error);
      }
    }
  };

  const handleRemove = async (item) => {
    try {
      await deleteOrdersDetails(item.ordersDetailsId);

      // Actualiza localmente mientras `refreshCart` sincroniza.
      setOrderDetails((prev) =>
        prev.filter((detail) => detail.ordersDetailsId !== item.ordersDetailsId)
      );

      if (orderDetails.length === 1) {
        clearOrder();
      }

      refreshCart();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const total = orderDetails.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <div className="order-container">
      {orderDetails.length === 0 ? (
        <div className="order-empty">
          <p>No hay productos en el carrito.</p>
        </div>
      ) : (
        <>
          <h2>Tu Carrito</h2>
          <div className="order-items">
            {orderDetails.map((item) => (
              <div key={item.ordersDetailsId} className="order-item">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="item-image"
                />
                <div className="item-details">
                  <h3>{item.productName}</h3>
                  <div className="item-controls">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                </div>
                <div className="item-subtotal">
                  <p>Precio: S/{item.price.toFixed(2)}</p>
                  <p>Subtotal: S/{item.subtotal.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleRemove(item)}
                  className="removeItem-button"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          <div className="order-summary">
            <h3>Total: S/{total.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};
