//HistorialOrdersService.js
import axiosInstance from "./axiosInstance";

// Obtener el historial de órdenes por rango de fechas
export const getHistorialOrdersByDateRange = async (start, end) => {
  try {
    const response = await axiosInstance.get("/historial-orders", {
      params: { start, end },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching historial orders by date range:", error);
    throw error;
  }
};

// Obtener el análisis diario con los días de la semana por rango de fechas
export const getDailyAnalysisWithDays = async (start, end) => {
  try {
    const response = await axiosInstance.get("/historial-orders/analysis/daily-with-days", {
      params: { start, end },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching daily analysis with days:", error);
    throw error;
  }
};


// Exportar órdenes detalladas a Excel
export const exportDetailedOrdersToExcel = async (start, end) => {
  try {
    const response = await axiosInstance.get("/historial-orders/export/detailed-excel", {
      params: { start, end },
      responseType: "blob", // Necesario para descargar archivos binarios
    });

    // Crear enlace para descargar el archivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "detailed-orders.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting detailed orders to Excel:", error);
    throw error;
  }
};

// Exportar análisis diario a Excel
export const exportDailyOrdersToExcel = async (start, end) => {
  try {
    const response = await axiosInstance.get("/historial-orders/export/excel", {
      params: { start, end },
      responseType: "blob", // Necesario para descargar archivos binarios
    });

    // Crear enlace para descargar el archivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "daily-orders-report.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting daily orders to Excel:", error);
    throw error;
  }
};
