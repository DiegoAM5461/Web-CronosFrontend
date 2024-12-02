import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { MainContentHistorialPedidos } from "../../components/MainContentHistorialPedidos/MainContentHistorialPedidos";

export const HistorialPedidos = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* Sidebar */}
          <Sidebar />
          {/* Contenido */}
          <MainContentHistorialPedidos/>
        </div>
      </div>
    </>
  );
};
