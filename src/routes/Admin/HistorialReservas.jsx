import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { MainContentHistorialReservas } from "../../components/MainContentHistorialReservas/MainContentHistorialReservas";


export const HistorialReservas = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* Sidebar */}
          <Sidebar />
          {/* Contenido */}
          <MainContentHistorialReservas/>
        </div>
      </div>
    </>
  );
};
