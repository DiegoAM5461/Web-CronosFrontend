import React from "react";
import { ItemCarta } from "./ItemCarta";
import './CartaComponent.css'

export const ContItems = ({ categoryId }) => {
  return (
    <>
    <div className="container-cartaPrincipal">
      <section className="menu-cartaPrincipal">
        <div className="items-cartaPrincipal">
          <ItemCarta categoryId={categoryId} />
        </div>
      </section>
    </div>
    </>
  );
};
