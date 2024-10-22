import { Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./routes/Inicio";
import { Carta } from "./routes/Carta";
import { Nosotros } from "./routes/Nosotros";
import { Contacto } from "./routes/Contacto";
import { Pickeos } from "./routes/Anidados/Pickeos";
import { Bebidas } from "./routes/Anidados/Bebidas";
import { Platos } from "./routes/Anidados/Platos";
import { Login } from "./routes/Login";
import { Registro } from "./routes/Anidados/Registro";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio></Inicio>}></Route>
        <Route path="/contacto" element={<Contacto></Contacto>}></Route>
        <Route path="/nosotros" element={<Nosotros></Nosotros>}></Route>
        <Route path="/login" element={<Login />}>
          <Route path="registro" element={<Registro></Registro>}></Route>
        </Route>
        {/* Ruta primcipal */}
        <Route path="/carta" element={<Carta></Carta>}>
          {/* subrutas */}
          <Route path="pickeos" element={<Pickeos></Pickeos>}></Route>
          <Route path="bebidas" element={<Bebidas></Bebidas>}></Route>
          <Route path="platos" element={<Platos></Platos>}></Route>
        </Route>
        <Route path="/*" element={<Navigate to="/" />}></Route>

        {/* AUMENTAR LAS RUTAS FUTURAS NECESARIAS */}
      </Routes>
    </>
  );
};
