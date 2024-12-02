import React, { useState, useEffect, useCallback } from "react";
import { ContItems } from "./ContItems";
import { ItemsAsked } from "./ItemsAsked";
import { getOrderByBoxOrTable, getCart } from "../../services/OrdersService";
import "./CartaComponent.css";

export const PedidosCarta = ({ categories }) => {
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const refreshCart = useCallback(async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const boxId = params.get("boxId");
      const tableCronosId = params.get("tableCronosId");
  
      if (!boxId && !tableCronosId) {
        setErrorMessage("Debe especificarse un boxId o tableCronosId.");
        return;
      }
  
      // Buscar pedido asociado a boxId o tableCronosId
      const order = await getOrderByBoxOrTable(boxId, tableCronosId);
  
      if (!order) {
        setErrorMessage("No se encontró un pedido pendiente asociado.");
        return;
      }
  
      // Obtener carrito utilizando ordersId
      const cartResponse = await getCart(order.ordersId);
      setCartItems(cartResponse.data.details || []);
    } catch (error) {
      console.error("PedidosCarta: Error al refrescar el carrito:", error);
      setErrorMessage("Error al refrescar el carrito.");
    }
  }, []);

  return (
    <div className="pedidos-carta">
      {errorMessage && <p className="carta-error-message">{errorMessage}</p>}
      <div className="pagination">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            className={`page-btn ${currentPage === page + 1 ? "active" : ""}`}
            onClick={() => paginate(page + 1)}
          >
            {page + 1}
          </button>
        ))}
      </div>

      <div className="carta-content">
        <div className="carta-products">
          {currentCategories.map((categoryId) => (
            <ContItems
              key={categoryId}
              categoryId={categoryId}
              refreshCart={refreshCart}
            />
          ))}
        </div>

        <div className="carta-orders">
          <ItemsAsked refreshCart={refreshCart} />
        </div>
      </div>
    </div>
  );
};
