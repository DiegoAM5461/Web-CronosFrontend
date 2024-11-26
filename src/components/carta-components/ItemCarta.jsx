import React, { useState, useEffect } from "react";
import { listProductsByCategoryId } from "../../services/ProductServices";
import { addProductToOrder } from "../../services/OrdersDetailsService";
import { createOrder } from "../../services/OrdersService";
import "./CartaComponent.css";

export const ItemCarta = ({
  categoryId,
  ordersId,
  setOrderId,
  refreshCart,
}) => {
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

  const handleAddToCart = async (product) => {
    try {
      // Usa el ID del pedido existente, evita crear uno nuevo innecesariamente
      let currentOrdersId = ordersId;

      if (!currentOrdersId) {
        const storedOrderId = localStorage.getItem("ordersId");
        if (storedOrderId) {
          currentOrdersId = storedOrderId;
          setOrderId(currentOrdersId);
        } else {
          // Crea un pedido nuevo solo si no hay uno en localStorage
          const response = await createOrder({ boxId: 1, tableCronosId: null });
          currentOrdersId = response.data.ordersId;
          localStorage.setItem("ordersId", currentOrdersId);
          setOrderId(currentOrdersId);
        }
      }

      const orderDetails = {
        ordersId: currentOrdersId,
        productId: product.productId,
        quantity: 1,
        boxId: 1,
        tableCronosId: null,
      };

      // Agrega el producto al pedido actual
      await addProductToOrder(orderDetails);

      // Refresca el carrito automáticamente
      if (typeof refreshCart === "function") refreshCart();

      alert(`${product.nombre} agregado al carrito`);
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    }
  };

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
                <button onClick={() => handleAddToCart(product)}>
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
