import { MainContentAdmin } from "../../components/MainContentAdmin/MainContentAdmin";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

export const AdminPedidos = () => {
  const location = useLocation();

  const hideElements = [
    "/administracion/mesas",
    "/administracion/pedido",
    "/administracion/historial",
    "/administracion/reservas",
    "/administracion/productos",
  ].includes(location.pathname);

  return (
    <div className="admin-container">
      <Sidebar />
      <Outlet />
      {!hideElements && (
        <>
          <div className="main-content-admin">
            <MainContentAdmin />
          </div>
        </>
      )}
    </div>
  );
};
