import React from "react";
import { CartaPrincipal } from "../../components/carta-components/CartaPrincipal";
import { ContItems } from "../../components/carta-components/ContItems";
import { ItemsAsked } from "../../components/carta-components/ItemsAsked";

export const Platos = ({ ordersId, refreshCart }) => {
  return (
    <>
      <div className="presentation-principal">
        <CartaPrincipal
          tituloCarta={"Platos"}
          direccionImagen={"/Imagenes/PUBLIC_IMAGES/logoCartaPlatos.jpeg"}
        />
      </div>
      <div className="cartaPrincipal-container">
        <div className="productsall-cartaPrincipal">
          <ContItems categoryId={14} ordersId={ordersId} refreshCart={refreshCart} />
        </div>
        <div className="pedidosMB-ordenes">
          <ItemsAsked ordersId={ordersId} />
        </div>
      </div>
    </>
  );
};
