import React from "react";
import './CartaComponent.css'

export const ItemsAsked = () => {
  return (
    <>
      <section className="order-cartaPrincipal">
        <h2>Mi pedido</h2>
        <div className="order-content-cartaPrincipal">
          <p>No tienes pedidos</p>
          <button>Aceptar</button>
        </div>
      </section>
    </>
  );
};
