import React from "react";
import "./MainContentPedidos.css";

export const MainContentPedidos = () => {
  return (
    <>
      <div class="box1pedidos-header">
        <div class="menu-icon">&#9776;</div>
        <div class="header-title">GESTIÓN DE PEDIDOS</div>
      </div>
      <div class="box2pedidos-content">
        <div class="control-header">
          <span>&#x1F527;</span> Mesa 1 - Pedidos
        </div>
        <div class="order-images">
          <img src="https://via.placeholder.com/100" alt="Coctel" />
          <img src="https://via.placeholder.com/100" alt="Cerveza Corona" />
          <img src="https://via.placeholder.com/100" alt="Hamburguesa" />
        </div>
        <div class="order-table">
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
        <div class="order-action">
          <button class="accept-button">Aceptar</button>
        </div>
      </div>
    </>
  );
};
