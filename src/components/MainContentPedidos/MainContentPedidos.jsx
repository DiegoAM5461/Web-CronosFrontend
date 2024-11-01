import React from "react";
import "./MainContentPedidos.css";

export const MainContentPedidos = () => {
  return (
    <>
      <div className="box1pedidos-header">
        <div className="menu-icon">&#9776;</div>
        <div className="header-title">GESTIÓN DE PEDIDOS</div>
      </div>
      <div className="box2pedidos-content">
        <div className="control-header">
          <span>&#x1F527;</span> Mesa 1 - Pedidos
        </div>
        <div className="order-images">
          <img src="https://via.placeholder.com/100" alt="Coctel" />
          <img src="https://via.placeholder.com/100" alt="Cerveza Corona" />
          <img src="https://via.placeholder.com/100" alt="Hamburguesa" />
        </div>
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Nombre</th>
                <th>Precio</th>
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
                <td colspan="2">Total:</td>
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
