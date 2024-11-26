import React from "react";
import { CartaPrincipal } from "../../components/carta-components/CartaPrincipal";
import { ContItems } from "../../components/carta-components/ContItems";
import { ItemsAsked } from "../../components/carta-components/ItemsAsked";

export const Pickeos = ({ ordersId, refreshCart }) => {
  return (
    <>
      <div className="presentation-principal">
        <CartaPrincipal
          tituloCarta={"Pickeos"}
          direccionImagen={"/Imagenes/PUBLIC_IMAGES/logoCartaPickeos.webp"}
        />
      </div>
      <div className="cartaPrincipal-container">
        <div className="productsall-cartaPrincipal">
          <ContItems categoryId={15} ordersId={ordersId} refreshCart={refreshCart} />
        </div>
        <div className="pedidosMB-ordenes">
          <ItemsAsked ordersId={ordersId} />
        </div>
      </div>
    </>
  );
};
