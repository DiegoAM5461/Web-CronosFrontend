import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ProductsCRUD } from "../../components/MainContentProductsCRUD/ProductsCRUD";

export const Productos = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* Sidebar */}
          <Sidebar />
          {/* Contenido */}
          <ProductsCRUD/>
        </div>
      </div>
    </>
  );
};
