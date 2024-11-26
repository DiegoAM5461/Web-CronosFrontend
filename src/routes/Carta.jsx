import React, { useState, useEffect } from "react";
import { Footer } from "../components/FooterC/Footer";
import { Header } from "../components/HeaderC/Header";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { CartaPrincipal } from "../components/carta-components/CartaPrincipal";
import { ContItems } from "../components/carta-components/ContItems";
import { ItemsAsked } from "../components/carta-components/ItemsAsked";
import { createOrder, getCart } from "../services/OrdersService";
import "./Pages-Css/Carta.css";

export const Carta = () => {
  const location = useLocation();
  const hideElements = ["/carta/pickeos", "/carta/platos"].includes(location.pathname);

  const [ordersId, setOrderId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const initializeOrder = async () => {
    try {
      const storedOrderId = localStorage.getItem("ordersId");
      if (storedOrderId) {
        setOrderId(storedOrderId);
        await fetchCart(storedOrderId);
      } else {
        const response = await createOrder({ boxId: 1, tableCronosId: null });
        const newOrderId = response.data.ordersId;
        setOrderId(newOrderId);
        localStorage.setItem("ordersId", newOrderId);
        await fetchCart(newOrderId);
      }
    } catch (error) {
      console.error("Error al inicializar el pedido:", error);
      setErrorMessage("No se pudo inicializar el pedido. Por favor, recarga la página.");
    }
  };

  const fetchCart = async (currentOrderId) => {
    try {
      const response = await getCart(currentOrderId || ordersId);
      setCartItems(response.data.details || []);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      setErrorMessage("No se pudo obtener el carrito. Inténtalo más tarde.");
    }
  };

  const clearOrder = () => {
    localStorage.removeItem("ordersId");
    setOrderId(null);
    setCartItems([]);
  };

  useEffect(() => {
    initializeOrder();
  }, []);

  const refreshCart = () => fetchCart();

  const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="carta-general">
      <Header />
      <div className="navbarCarta-container">
        <ul className="carta-navbar">
          <li><NavLink to="pickeos">Pickeos</NavLink></li>
          <li className="divider">|</li>
          <li><NavLink to="platos">Platos</NavLink></li>
          <li className="divider">|</li>
          <li><NavLink to="bebidas">Bebidas</NavLink></li>
        </ul>
      </div>
      <Outlet />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {!hideElements && ordersId && (
        <>
          <div className="presentation-principal">
            <CartaPrincipal
              tituloCarta={"Bebidas"}
              direccionImagen={"https://i.blogs.es/9bf91c/pexels-isabella-mendes-107313-340996/1366_2000.jpg"}
            />
          </div>
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
          <div className="cartaPrincipal-container">
            <div className="productsall-cartaPrincipal">
              {currentCategories.map((categoryId) => (
                <ContItems
                  key={categoryId}
                  categoryId={categoryId}
                  orderId={ordersId}
                  setOrderId={setOrderId}
                  refreshCart={refreshCart}
                />
              ))}
            </div>
            <div className="pedidosMB-ordenes">
              <ItemsAsked
                ordersId={ordersId}
                items={cartItems}
                refreshCart={refreshCart}
                clearOrder={clearOrder}
              />
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};
