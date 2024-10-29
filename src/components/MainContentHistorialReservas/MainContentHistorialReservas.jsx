import React from "react";
import "./MainContentHistorialReservas.css";

export const MainContentHistorialReservas = () => {
  return (
    <>
      <div className="box1reservas-header">
        <div className="menu-icon">&#9776;</div>
        <div className="header-title">GESTIÓN DE PEDIDOS</div>
      </div>
      <div className="box2reservas-content">
        <div className="control-header">
          <span>&#x1F527;</span> Historial de reservas
        </div>
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Estado Anterior</th>
                <th>Estado Nuevo</th>
                <th>Fecha Cambio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Botella</td>
                <td>S/.</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Whisky</td>
                <td>S/.</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Coctel</td>
                <td>S/.</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Cerveza Corona</td>
                <td>S/.</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Hamburguesa</td>
                <td>S/.</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total:</td>
                <td>S/.</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="order-action">
          <button className="accept-button">Aceptar</button>
        </div>
      </div>
    </>
  );
};
