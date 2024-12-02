import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { MainContentReservas } from "../../components/MainContentReservas/MainContentReservas";

export const AdminReservas = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* Sidebar */}
          <Sidebar />
          {/* Contenido */}
          <MainContentReservas/>
        </div>
      </div>
    </>
  );
};
