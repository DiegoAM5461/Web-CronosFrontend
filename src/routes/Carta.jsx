import { Footer } from "../components/FooterC/Footer";
import { Header } from "../components/HeaderC/Header";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./Pages-Css/Carta.css";

export const Carta = () => {
  const location = useLocation();

  const hideElements = [
    "/carta/bebidas",
    "/carta/pickeos",
    "/carta/platos",
  ].includes(location.pathname);

  return (
    <>
      <Header />
      <ul className="carta-navbar">
        <li>
          <NavLink to="pickeos">Pickeos</NavLink>
        </li>
        <li className="divider">|</li>
        <li>
          <NavLink to="platos">Platos</NavLink>
        </li>
        <li className="divider">|</li>
        <li>
          <NavLink to="bebidas">Bebidas</NavLink>
        </li>
      </ul>
      <Outlet />
      {!hideElements && <>
        <h1>PERROS CALIENTES</h1>
      </>}
      <Footer />
    </>
  );
};
