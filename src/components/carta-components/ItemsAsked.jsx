import React, { useState, useEffect } from "react";
import {
  removeProductFromOrder,
  updateProductQuantityInOrder,
  getOrderDetails,
} from "../../services/OrdersDetailsService";
import { confirmOrder } from "../../services/OrdersService"; // Confirmar pedido
import "./CartaComponent.css";

export const ItemsAsked = ({ ordersId, refreshCart, clearOrder }) => {
  const [items, setItems] = useState([]);
  console.log("Orders ID en ItemsAsked:", ordersId);

  // Cargar los productos del carrito
  const fetchCart = () => {
    if (ordersId) {
      getOrderDetails(ordersId)
        .then((response) => {
          console.log("Datos del carrito recibidos:", response.data);
          setItems(response.data); // Actualizar el estado con los detalles
        })
        .catch((error) => console.error("Error al cargar el carrito:", error));
    }
  };

  useEffect(() => {
    fetchCart();
  }, [ordersId]);

  const handleIncrement = (item) => {
    const updatedDetails = {
      ...item,
      quantity: item.quantity + 1,
      subtotal: (item.quantity + 1) * item.price,
    };
    updateProductQuantityInOrder(item.ordersDetailsId, updatedDetails)
      .then(() => fetchCart()) // Refrescar el carrito después de incrementar
      .catch((error) => console.error("Error al incrementar cantidad:", error));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const updatedDetails = {
        ...item,
        quantity: item.quantity - 1,
        subtotal: (item.quantity - 1) * item.price,
      };
      updateProductQuantityInOrder(item.ordersDetailsId, updatedDetails)
        .then(() => fetchCart()) // Refrescar el carrito después de decrementar
        .catch((error) =>
          console.error("Error al decrementar cantidad:", error)
        );
    }
  };

  const handleRemove = (item) => {
    removeProductFromOrder(ordersId, item.productId, item.quantity)
      .then(() => fetchCart()) // Refrescar el carrito después de eliminar un producto
      .catch((error) => console.error("Error al eliminar producto:", error));
  };

  const handleConfirmOrder = () => {
    confirmOrder(ordersId)
      .then(() => {
        alert("Pedido confirmado exitosamente.");
        clearOrder();
      })
      .catch((error) => console.error("Error al confirmar el pedido:", error));
  };

  const total = items.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <div className="order-container">
      <h2>Tu Pedido</h2>
      <div className="order-items">
        {items.map((item) => (
          <div key={item.ordersDetailsId} className="order-item">
            <img
              src={item.productImage || "https://via.placeholder.com/50"}
              alt={item.productName}
              className="item-image"
            />
            <div className="item-details">
              <h3>{item.productName}</h3>
              <p>${item.price.toFixed(2)}</p>
              <div className="item-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <p>Subtotal: ${item.subtotal.toFixed(2)}</p>
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
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={handleConfirmOrder} className="checkout-button">
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
};
