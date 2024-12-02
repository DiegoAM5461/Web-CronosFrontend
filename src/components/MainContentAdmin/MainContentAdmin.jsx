import React, { useEffect, useState } from "react";
import "./MainContentAdmin.css";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  getDailyAnalysisWithDays,
  getHistorialOrdersByDateRange,
} from "../../services/HistorialOrdersService";

export const MainContentAdmin = () => {
  const [pedidosData, setPedidosData] = useState([]);
  const [topProductsData, setTopProductsData] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

  useEffect(() => {
    const fetchDailyOrdersData = async () => {
      try {
        const start = "2024-11-01T00:00:00";
        const end = "2024-12-01T23:59:59";

        const response = await getDailyAnalysisWithDays(start, end);

        const groupedData = response.reduce((acc, item) => {
          const { dia_semana, total_ordenes } = item;
          acc[dia_semana] = (acc[dia_semana] || 0) + total_ordenes;
          return acc;
        }, {});

        const daysOrder = [
          "lunes",
          "martes",
          "miércoles",
          "jueves",
          "viernes",
          "sábado",
          "domingo",
        ];
        const chartData = daysOrder.map((day) => ({
          day,
          pedidos: groupedData[day] || 0,
        }));

        setPedidosData(chartData);
      } catch (error) {
        console.error("Error fetching daily orders data:", error);
      }
    };

    const fetchTopProductsData = async () => {
      try {
        const start = "2024-11-01T00:00:00";
        const end = "2024-12-01T23:59:59";

        const response = await getHistorialOrdersByDateRange(start, end);

        const productQuantities = response.reduce((acc, historial) => {
          historial.orders.details.forEach((detail) => {
            const { productName, quantity } = detail;
            acc[productName] = (acc[productName] || 0) + quantity;
          });
          return acc;
        }, {});

        const sortedProducts = Object.entries(productQuantities)
          .map(([name, quantity]) => ({ name, quantity }))
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 5);

        setTopProductsData(sortedProducts);
      } catch (error) {
        console.error("Error fetching top products data:", error);
      }
    };

    fetchDailyOrdersData();
    fetchTopProductsData();
  }, []);

  const dayColors = {
    lunes: "#7EB3FF",
    martes: "#FFA07A",
    miércoles: "#90EE90",
    jueves: "#FFD700",
    viernes: "#ADD8E6",
    sábado: "#FFB6C1",
    domingo: "#D3D3D3",
  };

  return (
    <div className="col py-3">
      <div className="box1-header">
        <i className="fa-solid fa-bars fa-2x"></i>
        <h1> INICIO </h1>
      </div>

      <div className="chart-container">
        <h2>Días con más pedidos</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={pedidosData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pedidos" barSize={30}>
              {pedidosData.map((entry) => (
                <Cell key={`cell-${entry.day}`} fill={dayColors[entry.day]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h2>Productos Más Vendidos del Mes</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={topProductsData}
              dataKey="quantity"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {topProductsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
