import React from "react";
import { NavLink, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { Footer } from "../components/FooterC/Footer";
import { Header } from "../components/HeaderC/Header";
import "./Pages-Css/Carta.css";
import { ItemsShow } from "../components/carta-components/ShowComponentsCarta/ItemsShow";

export const Carta = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const boxId = searchParams.get("boxId");
  const tableCronosId = searchParams.get("tableCronosId");

  const hideElements = [
    "/carta/pickeos",
    "/carta/platos",
    "/carta/bebidas",
  ].includes(location.pathname);

  // Generar parámetros para los enlaces
  const params = boxId
    ? `?boxId=${boxId}`
    : tableCronosId
    ? `?tableCronosId=${tableCronosId}`
    : "";

  return (
    <>
      <Header />
      <div className="carta-general">
        <div className="navbarCarta-container">
          <ul className="carta-navbar">
            <li>
              <NavLink to={`pickeos${params}`}>Pickeos</NavLink>
            </li>
            <li className="divider">|</li>
            <li>
              <NavLink to={`platos${params}`}>Platos</NavLink>
            </li>
            <li className="divider">|</li>
            <li>
              <NavLink to={`bebidas${params}`}>Bebidas</NavLink>
            </li>
          </ul>
        </div>
        {!hideElements && (
          <>
            <div
              id="carouselExampleInterval"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="5000"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://cuberspremium.com/wp-content/uploads/2024/10/receta-coctel-pisco-sour.jpg"
                    className="d-block w-100"
                    alt="Bebidas"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Bebidas</h5>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="https://cdn.bolivia.com/gastronomia/2012/11/13/arroz-chaufa-con-pollo-3497-1.jpg"
                    className="d-block w-100"
                    alt="Platos"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Platos</h5>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="https://puertovelero.net/wp-content/uploads/2020/07/CHICHARRON-POLLO.jpg"
                    className="d-block w-100"
                    alt="Pickeos"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Pickeos</h5>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <ItemsShow />
          </>
        )}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
