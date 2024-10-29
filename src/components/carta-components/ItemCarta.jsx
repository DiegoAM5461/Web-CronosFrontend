import React, { useState } from "react";
import "./CartaPrincipal";
import { useEffect } from "react";
import { listProducts } from "../../services/ProductServices";

export const ItemCarta = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    listProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      {products.map((product) => (
        <div  key={product.id_product} className="item-cartaPrincipal">
          <div className="item-image-cartaPrincipal"><img src={product.direccionImg}></img></div>
          <h3>{product.nombre}</h3>
          <p>Precio desde: {product.precio}</p>
          <button>Agregar</button>
        </div>
      ))}
    </>
  );
};
