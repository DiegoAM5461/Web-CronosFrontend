import React, { useState, useEffect } from "react";
import { listProductsByCategoryId } from "../../services/ProductServices";
import './CartaComponent.css'

export const ItemCarta = ({ categoryId }) => {
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    if (categoryId) {
      listProductsByCategoryId(categoryId)
        .then((response) => {
          setCategoryData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products by category:", error);
        });
    }
  }, [categoryId]);

  return (
    <>
      {categoryData && (
        <div className="items-cartaPrincipal">
          <div className="container-categoryName">
            <h2>{categoryData.nombreCategory}</h2>
          </div>
          {categoryData.products.map((product) => (
            <div key={product.productId} className="product-item">
              <div className="item-image-cartaPrincipal">
                <img src={product.direccionImg} alt={product.nombre} />
              </div>
              <div className="pagarItem">
                <h3>{product.nombre}</h3>
                <p>Precio desde: {product.precio}</p>
                <button>Agregar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
