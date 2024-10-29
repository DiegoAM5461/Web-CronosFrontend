import React from "react";
import "./MainContentAdmin.css";
export const MainContentAdmin = () => {
  return (
    <>
      <div className="box1-header"><i class="fa-solid fa-bars fa-2x"></i><h1>GESTION DE PEDIDOS</h1></div>
      <div class="box2-contenido">
        <div class="table-control selected">
          <img src="https://via.placeholder.com/60" alt="Mesa 1" />
          <div class="table-label">Mesa 1</div>
        </div>
        
        <div class="table-control">
          <img src="https://via.placeholder.com/60" alt="Mesa 2" />
          <div class="table-label">Mesa 2</div>
        </div>
        <div class="table-control">
          <img src="/Imagenes/alitas.jpg" alt="Mesa 3" />
          <div class="table-label">Mesa 3</div>
        </div>
        <div class="table-control">
          <img src="https://via.placeholder.com/80" alt="Mesa 4" />
          <div class="table-label">Mesa 4</div>
        </div>
        <div class="table-control">
          <img src="https://via.placeholder.com/60" alt="Mesa 5" />
          <div class="table-label">Mesa 5</div>
        </div>
        <div class="table-control">
          <img src="https://via.placeholder.com/60" alt="Mesa 6" />
          <div class="table-label">Mesa 6</div>
        </div>
      </div>
    </>
  );
};
