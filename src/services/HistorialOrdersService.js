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
