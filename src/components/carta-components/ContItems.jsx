import React from "react";
import { ItemCarta } from "./ItemCarta";
import "./CartaComponent.css";

export const ContItems = ({ categoryId, ordersId, setOrderId, refreshCart }) => {
  return (
    <div className="container-cartaPrincipal">
      <section className="menu-cartaPrincipal">
        <div className="items-cartaPrincipal">
          <ItemCarta
            categoryId={categoryId}
            ordersId={ordersId}
            setOrderId={setOrderId}
            refreshCart={refreshCart}
          />
        </div>
      </section>
    </div>
  );
};
