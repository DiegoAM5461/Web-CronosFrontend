import React from "react";
import { ItemCarta } from "./ItemCarta";
import "./CartaComponent.css";
//CHECKPOINT
export const ContItems = ({ categoryId, refreshCart }) => {
  return (
    <div className="container-cartaPrincipal">
      <section className="menu-cartaPrincipal">
        <div className="items-cartaPrincipal">
          <ItemCarta categoryId={categoryId} refreshCart={refreshCart} />
        </div>
      </section>
    </div>
  );
};
