import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
export const Sidebar = () => {
  
  return (
    <>
        <div className="sidebar-admin">
        <div className="profile">
          <img src="https://via.placeholder.com/80" alt="Profile" />
          <div className="name-role">
            <p>Empleado: X</p>
            <p>Rol: Administrador</p>
          </div>
        </div>
        <div className="nav">
          {/* Para el otro ciclo VERANO LO ES TODO */}
          <NavLink className="mesas" to='mesas'>Mesas</NavLink>
          <NavLink className="pedido" to='pedido'>Pedidos</NavLink>
          <NavLink className="historial" to='historial'>Historial</NavLink>
          <NavLink className="reservas" to='reservas'>Reservas</NavLink>
          <NavLink className="productos" to='productos'>Productos</NavLink>
        </div>
        <div className="logout">
              <NavLink className="nav-link" to='/'>Salir</NavLink>
        </div>
      </div>
    </>
  );
};
