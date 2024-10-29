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
import { AdminPedidos } from "./routes/Admin/AdminPedidos";
import { Reservacion } from "./routes/Reservacion";
import { Mesas } from "./routes/Admin/Mesas";
import { Pedidos } from "./routes/Admin/Pedidos";
import { HistorialPedidos } from "./routes/Admin/HistorialPedidos";
import { HistorialReservas } from "./routes/Admin/HistorialReservas";
import { Productos } from "./routes/Admin/Productos";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio></Inicio>}></Route>
      <Route path="/contacto" element={<Contacto></Contacto>}></Route>
      <Route path="/nosotros" element={<Nosotros></Nosotros>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/reservaciones" element={<Reservacion />}></Route>
      <Route path="/registro" element={<Registro />}></Route>
      {/* Administracion */}
      <Route path="/administracion" element={<AdminPedidos />}>
        <Route path="mesas" element={<Mesas />}></Route>
        <Route path="pedido" element={<Pedidos />}></Route>
        <Route path="historial" element={<HistorialPedidos />}></Route>
        <Route path="reservas" element={<HistorialReservas />}>
          <Route path="historialReservas" element={<HistorialReservas />}></Route>
        </Route>
        <Route path="productos" element={<Productos />}></Route>
      </Route>
      <Route path="/carta" element={<Carta></Carta>}>
        {/* subrutas */}
        <Route path="pickeos" element={<Pickeos></Pickeos>}></Route>
        <Route path="bebidas" element={<Bebidas></Bebidas>}></Route>
        <Route path="platos" element={<Platos></Platos>}></Route>
      </Route>
      <Route path="/*" element={<Navigate to="/" />}></Route>

      {/* AUMENTAR LAS RUTAS FUTURAS NECESARIAS */}
    </Routes>
  );
};
