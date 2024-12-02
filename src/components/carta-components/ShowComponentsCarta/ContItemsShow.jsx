import React from "react";
import { ItemsCartaShow } from "./ItemsCartaShow";

export const ContItemsShow = ({ categoryId }) => {
  return (
    <div className="container-cartaPrincipal">
      <section className="menu-cartaPrincipal">
        <div className="items-cartaPrincipal">
          <ItemsCartaShow categoryId={categoryId} />
        </div>
      </section>
    </div>
  );
};
