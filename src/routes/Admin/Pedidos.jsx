import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { MainContentPedidos } from "../../components/MainContentPedidos/MainContentPedidos";

export const Pedidos = () => {
  const estados = ["PENDIENTE", "CONFIRMADO"]; // Lista de estados que quieres incluir
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* Sidebar */}
          <Sidebar />
          {/* Contenido */}
          <MainContentPedidos estados={estados} />
        </div>
      </div>
    </>
  );
};

