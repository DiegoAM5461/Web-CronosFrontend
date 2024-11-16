import React from "react";
import './CartaComponent.css'

export const CartaPrincipal = ({ tituloCarta, direccionImagen }) => {
  return (
    <>
      <section className="header-cartaPrincipal">
        <div className="header-contentCarta">
          <div className="header-imageCarta">
            <img src={direccionImagen} alt={tituloCarta} />
          </div>
          <h1>{tituloCarta}</h1>
        </div>
      </section>
    </>
  );
};
