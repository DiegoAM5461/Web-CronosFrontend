import React, { useState, useEffect } from "react";
import { listProductsByCategoryId } from "../../services/ProductServices";
import { addProductToOrder } from "../../services/OrdersDetailsService";
import "./CartaComponent.css";
//CHECKPOINT ITEMCARTA
export const ItemCarta = ({ categoryId, refreshCart }) => {
  const [categoryData, setCategoryData] = useState(null);
  const params = new URLSearchParams(window.location.search);
  const boxId = params.get("boxId");
  const tableCronosId = params.get("tableCronosId");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await listProductsByCategoryId(categoryId);
        setCategoryData(response.data);
      } catch (error) {
        console.error("ItemCarta: Error al obtener los productos de la categoría:", error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleAddToCart = async (product) => {
    if (!product || !product.productId) {
      console.error("Producto inválido:", product);
      return;
    }

    try {
      const orderDetails = {
        productId: product.productId,
        quantity: 1,
        boxId: boxId ? parseInt(boxId, 10) : null,
        tableCronosId: tableCronosId ? parseInt(tableCronosId, 10) : null,
      };

      await addProductToOrder(orderDetails);
      refreshCart();
    } catch (error) {
      console.error("", error);
    }
  };

  return (
    categoryData && (
      <div className="items-cartaPrincipal">
        <h2 className="container-categoryName">{categoryData.nombreCategory}</h2>
        {categoryData.products.map((product) => (
          <div key={product.productId} className="product-item">
            <div className="item-image-cartaPrincipal">
              <img src={product.direccionImg} alt={product.nombre} />
            </div>
            <h3>{product.nombre}</h3>
            <p>Precio: S/ {product.precio}</p>
            <button onClick={() => handleAddToCart(product)}>Agregar</button>
          </div>
        ))}
      </div>
    )
  );
};
