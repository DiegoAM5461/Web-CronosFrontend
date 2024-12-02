import React, { useState, useEffect } from "react";
import { listProductsByCategoryId } from "../../../services/ProductServices";
import "./DiseñosShow.css";

export const ItemsCartaShow = ({ categoryId }) => {
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    if (categoryId) {
      listProductsByCategoryId(categoryId)
        .then((response) => setCategoryData(response.data))
        .catch((error) =>
          console.error(
            "Error al obtener los productos de la categoría:",
            error
          )
        );
    }
  }, [categoryId]);

  return (
    <>
      {categoryData && (
        <div className="items-carta-container">
          <div className="category-name-container">
            <h2>{categoryData.nombreCategory}</h2>
          </div>
          <div className="products-grid-container">
            {categoryData.products.map((product) => (
              <div key={product.productId} className="product-card">
                <div className="product-card-inner">
                  {/* Cara frontal */}
                  <div className="product-card-front">
                    <img
                      src={product.direccionImg}
                      className="product-image"
                      alt={product.nombre}
                    />
                  </div>
                  {/* Cara trasera */}
                  <div className="product-card-back">
                    <div class="product-card-back-icons">
                      <i class="fas fa-cart-plus"></i>
                      <i class="fas fa-info-circle"></i>
                    </div>
                    <h5 className="product-title">{product.nombre}</h5>
                    <p className="product-price">Precio: S/{product.precio}</p>
                    <p className="product-description">{product.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
