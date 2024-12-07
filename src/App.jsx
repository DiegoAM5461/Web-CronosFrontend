import { Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./routes/Inicio";
import { Carta } from "./routes/Carta";
import { Nosotros } from "./routes/Nosotros";
import { Contacto } from "./routes/Contacto";
import { Pickeos } from "./routes/Anidados/Pickeos";
import { Bebidas } from "./routes/Anidados/Bebidas";
import { Platos } from "./routes/Anidados/Platos";
import { Login } from "./routes/Login";
import { Registro } from "./routes/Registro";
import { AdministracionGeneral } from "./routes/Admin/AdministracionGeneral";
import { Reservacion } from "./routes/Reservacion";
import { Mesas } from "./routes/Admin/Mesas";
import { Pedidos } from "./routes/Admin/Pedidos";
import { HistorialPedidos } from "./routes/Admin/HistorialPedidos";
import { HistorialReservas } from "./routes/Admin/HistorialReservas";
import { Productos } from "./routes/Admin/Productos";
import { AdminReservas } from "./routes/Admin/AdminReservas";
import { AdminUsers } from "./routes/Admin/AdminUsers";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { PersistBoxIdOrTableCronosId } from "./components/PersistCronos/PersistBoxIdOrTableCronosId";

export const App = () => {
  return (
      <PersistBoxIdOrTableCronosId>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reservaciones" element={<Reservacion />} />
          <Route path="/registro" element={<Registro />} />

          {/* Administracion */}
          <Route path="/administracion" element={<AdministracionGeneral />} />
          <Route path="/administracion/mesas" element={<Mesas />} />
          <Route path="/administracion/pedido/:id" element={<Pedidos />} />
          <Route path="/administracion/pedido/" element={<Pedidos />} />
          <Route
            path="/administracion/historialpedidos"
            element={<HistorialPedidos />}
          />
          <Route path="/administracion/reservas" element={<AdminReservas />} />
          <Route
            path="/administracion/historialreservas"
            element={<HistorialReservas />}
          />
          <Route path="/administracion/adminusers" element={<AdminUsers />} />
          <Route path="/administracion/productos" element={<Productos />} />

          {/* Carta y subrutas */}
          <Route path="/carta" element={<Carta />}>
            <Route path="pickeos" element={<Pickeos />} />
            <Route path="bebidas" element={<Bebidas />} />
            <Route path="platos" element={<Platos />} />
          </Route>

          {/* Redirección por defecto */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </PersistBoxIdOrTableCronosId>
  );
};
