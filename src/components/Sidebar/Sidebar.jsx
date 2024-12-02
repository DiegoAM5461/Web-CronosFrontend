import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  const location = useLocation();

  // Estado para controlar los submenús
  const [submenuOpen, setSubmenuOpen] = useState({
    pedidos: false,
    historiales: false,
  });

  // Estado para almacenar el nombre del usuario
  const [username, setUsername] = useState("");

  // Efecto para obtener el nombre del usuario desde localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Función para alternar el estado de un submenú
  const toggleSubmenu = (menu) => {
    setSubmenuOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  // Efecto para mantener los submenús abiertos según la ruta activa
  useEffect(() => {
    if (
      location.pathname.startsWith("/administracion/mesas") ||
      location.pathname.startsWith("/administracion/pedido")
    ) {
      setSubmenuOpen({ pedidos: true, historiales: false });
    } else if (
      location.pathname.startsWith("/administracion/historialpedidos") ||
      location.pathname.startsWith("/administracion/historialreservas")
    ) {
      setSubmenuOpen({ pedidos: false, historiales: true });
    } else {
      setSubmenuOpen({ pedidos: false, historiales: false });
    }
  }, [location.pathname]);

  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white min-vh-100">
        {/* Título del menú */}
        <NavLink
          to="/"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-1 d-none d-sm-inline fw-bold">Menú</span>
        </NavLink>

        {/* Menú de navegación */}
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item mb-3">
            <NavLink
              className="nav-link align-middle px-0 text-white"
              to="/administracion"
            >
              <i className="fs-4 bi-house"></i>
              <span className="ms-2 fs-4 d-none d-sm-inline">Inicio</span>
            </NavLink>
          </li>

          {/* Administración Pedidos */}
          <li className="nav-item mb-3">
            <div
              className="nav-link px-0 align-middle text-white"
              onClick={() => toggleSubmenu("pedidos")}
              style={{ cursor: "pointer" }}
            >
              <i className="fs-4 bi-gear"></i>
              <span className="ms-2 fs-4 d-none d-sm-inline">
                Administración Pedidos
              </span>
            </div>
            <ul
              className={`nav flex-column ms-3 ${
                submenuOpen.pedidos ? "show" : "collapse"
              }`}
              id="submenuPedidos"
            >
              <li className="nav-item mb-2">
                <NavLink
                  className="nav-link px-0 text-white"
                  to="/administracion/mesas"
                >
                  <i className="fs-4 bi-table"></i>
                  <span className="ms-2 fs-5 d-none d-sm-inline">
                    Mesas y Boxes
                  </span>
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  className="nav-link px-0 text-white"
                  to="/administracion/pedido"
                >
                  <i className="fs-4 bi-cart-check"></i>
                  <span className="ms-2 fs-5 d-none d-sm-inline">Pedidos</span>
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Administración Historiales */}
          <li className="nav-item mb-3">
            <div
              className="nav-link px-0 align-middle text-white"
              onClick={() => toggleSubmenu("historiales")}
              style={{ cursor: "pointer" }}
            >
              <i className="fs-4 bi-gear"></i>
              <span className="ms-2 fs-4 d-none d-sm-inline">
                Administración Historiales
              </span>
            </div>
            <ul
              className={`nav flex-column ms-3 ${
                submenuOpen.historiales ? "show" : "collapse"
              }`}
              id="submenuHistoriales"
            >
              <li className="nav-item mb-2">
                <NavLink
                  className="nav-link px-0 text-white"
                  to="/administracion/historialpedidos"
                >
                  <i className="fs-4 bi-clock-history"></i>
                  <span className="ms-2 fs-5 d-none d-sm-inline">
                    Historial Pedidos
                  </span>
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  className="nav-link px-0 text-white"
                  to="/administracion/historialreservas"
                >
                  <i className="fs-4 bi-clock-history"></i>
                  <span className="ms-2 fs-5 d-none d-sm-inline">
                    Historial Reservas
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="nav-item mb-3">
            <NavLink
              className="nav-link px-0 align-middle text-white"
              to="/administracion/productos"
            >
              <i className="fs-4 bi-box"></i>
              <span className="ms-2 fs-4 d-none d-sm-inline">Productos</span>
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              className="nav-link px-0 align-middle text-white"
              to="/administracion/reservas"
            >
              <i className="fs-4 bi-calendar-check"></i>
              <span className="ms-2 fs-4 d-none d-sm-inline">Reservas</span>
            </NavLink>
          </li>
          <li className="nav-item mb-3">
            <NavLink
              className="nav-link px-0 align-middle text-white"
              to="/administracion/adminusers"
            >
              <i className="fs-4 bi-person-circle"></i>
              <span className="ms-2 fs-4 d-none d-sm-inline">Usuarios</span>
            </NavLink>
          </li>
        </ul>

        <hr className="text-secondary w-100" />

        {/* Perfil del usuario */}
        <div className="dropdown pb-4">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
              alt="Profile"
              width="50"
              height="50"
              className="rounded-circle"
            />
            {/* Mostrar el nombre del usuario */}
            <span className="fs-5 d-none d-sm-inline mx-2">{username}</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <NavLink className="dropdown-item" to="/perfil">
                Perfil
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <NavLink className="dropdown-item" to="/">
                Salir
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
