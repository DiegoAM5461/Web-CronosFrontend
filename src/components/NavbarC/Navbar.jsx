import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Función para añadir los parámetros existentes a los enlaces
  const addParamsToLink = (path) => {
    return `${path}?${params.toString()}`;
  };

  return (
    <>
      <div className="container-navegacion">
        <nav className="navegacion container">
          <i className="fa-solid fa-bars"></i>
          <ul className="menu">
            <li>
              <NavLink className="nav-link" to={addParamsToLink("/")}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to={addParamsToLink("/nosotros")}>
                Nosotros
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to={addParamsToLink("/carta")}>
                Carta
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to={addParamsToLink("/contacto")}>
                Contacto
              </NavLink>
            </li>
            {/* Ir aumentando los links que sean necesarios a futuro */}
          </ul>
        </nav>
      </div>
    </>
  );
};
