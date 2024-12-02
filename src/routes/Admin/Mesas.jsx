import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { MainContentMesas } from "../../components/MainContentMesas/MainContentMesas";

export const Mesas = () => {
  return (
    < >
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* Sidebar */}
          <Sidebar />
          {/* Contenido */}
          <MainContentMesas />

        </div>
      </div>
    </>
  );
};
