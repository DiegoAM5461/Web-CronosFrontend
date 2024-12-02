import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const PersistBoxIdOrTableCronosId = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const boxId = params.get("boxId");
    const tableCronosId = params.get("tableCronosId");

    // Validar si existen ambos parámetros
    if (boxId && tableCronosId) {
      alert("Error: No pueden coexistir 'boxId' y 'tableCronosId'.");
      navigate("/", { replace: true });
    }

    // Validar valores permitidos
    const validBoxIds = ["1", "2", "3", "4", "5", "6"];
    const validTableCronosIds = ["1", "2", "3"];

    if (boxId && !validBoxIds.includes(boxId)) {
      alert("Error: 'boxId' inválido.");
      navigate("/", { replace: true });
    }

    if (tableCronosId && !validTableCronosIds.includes(tableCronosId)) {
      alert("Error: 'tableCronosId' inválido.");
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return <>{children}</>;
};
