import { Footer } from "../components/FooterC/Footer";
import { Header } from "../components/HeaderC/Header";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./Pages-Css/Carta.css";
import { CartaPrincipal } from "../components/carta-components/CartaPrincipal";
import { ContItems } from "../components/carta-components/ContItems";
import { ItemsAsked } from "../components/carta-components/ItemsAsked";

export const Carta = () => {
  const location = useLocation();

  const hideElements = ["/carta/pickeos", "/carta/platos"].includes(
    location.pathname
  );

  return (
    <>
      <div className="carta-general">
        <Header />
        <div className="navbarCarta-container">
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
        </div>
        <Outlet />
        {!hideElements && (
          <>
            <div className="presentation-principal">
              <CartaPrincipal
                tituloCarta={"Bebidas"}
                direccionImagen={
                  "/public/Imagenes/BOTELLAS PISCO/Queirolo_Quebranta_(Botella).webp"
                }
              />
            </div>
            <div className="cartaPrincipal-container">
              <div className="productsall-cartaPrincipal">
                <ContItems categoryId={1} />
                <ContItems categoryId={2} />
                <ContItems categoryId={3} />
                <ContItems categoryId={4} />
                <ContItems categoryId={5} />
                <ContItems categoryId={6} />
                <ContItems categoryId={7} />
                <ContItems categoryId={8} />
                <ContItems categoryId={9} />
                <ContItems categoryId={10} />
                <ContItems categoryId={11} />
                <ContItems categoryId={12} />
                <ContItems categoryId={13} />
              </div>
              <div className="pedidosMB-ordenes">
                <ItemsAsked />
              </div>
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
};
