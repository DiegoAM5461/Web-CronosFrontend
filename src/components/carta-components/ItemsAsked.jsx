import React, { useState } from "react";
import "./CartaComponent.css";

export const ItemsAsked = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Box Engasse",
      price: 15000,
      quantity: 1,
      img: "url-imagen1",
    },
    { id: 2, name: "Knock Nap", price: 35000, quantity: 1, img: "url-imagen2" },
  ]);

  const handleIncrement = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="order-container">
      <h2>Tu Pedido</h2>
      <div className="order-items">
        {items.map((item) => (
          <div key={item.id} className="order-item">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0WgVwW-_RD-ph8bDtglOb_Mb17Tq_GTKfw&s"
            alt={item.name}
            className="item-image"
          />
          <div className="item-details">
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>${(item.price / 1000).toFixed(3)}</p>
            </div>
            <div className="item-actions">
              <div className="item-controlsAsked">
                <button
                  className="decrementItems"
                  onClick={() => handleDecrement(item.id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="incrementItems"
                  onClick={() => handleIncrement(item.id)}
                >
                  +
                </button>
              </div>
              <div className="subtotalItems">
                ${((item.price * item.quantity) / 1000).toFixed(3)}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleRemove(item.id)}
            className="removeItem-button"
          >
            🗑️
          </button>
        </div>
        ))}
      </div>
      <div className="order-summary">
        <h3>Total: ${(total / 1000).toFixed(3)}</h3>
        <button className="checkout-button">Pedir</button>
      </div>
    </div>
  );
};
