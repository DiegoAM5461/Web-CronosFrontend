import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { UsersCRUD } from "../../components/MainContentUsers/UsersCRUD";

export const AdminUsers = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* Sidebar */}
          <Sidebar />
          {/* Contenido */}
          <UsersCRUD/>
        </div>
      </div>
    </>
  );
};
