import { useEffect, useState } from "react";
import { CardsCaract } from "../CardCaractC/CardsCaract";
import { CardsP } from "../CardProductC/CardsP";
import { InfroCronos } from "../InfoCronosC/InfroCronos";
import { InfoBanner } from "../InforBannerC/InfoBanner";
import { getHistorialOrdersByDateRange } from "../../services/HistorialOrdersService";
import "./MainContent.css";
import "bootstrap/dist/css/bootstrap.min.css";


export const MainContent = () => {
  const [topProducts, setTopProducts] = useState([]); // Estado para los 5 productos más vendidos

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const start = "2024-11-01T00:00:00";
        const end = "2024-12-12T23:59:59";

        const response = await getHistorialOrdersByDateRange(start, end);

        const productQuantities = response.reduce((acc, historial) => {
          historial.orders.details.forEach((detail) => {
            const { productName, productImage, quantity } = detail;
            if (!acc[productName]) {
              acc[productName] = { quantity: 0, productImage };
            }
            acc[productName].quantity += quantity;
          });
          return acc;
        }, {});

        const sortedProducts = Object.entries(productQuantities)
          .map(([name, { quantity, productImage }]) => ({
            name,
            quantity,
            productImage,
          }))
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 5);

        setTopProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching top products:", error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <>
      <div className="first-main w-100">
        <section className="container container-caracteristicas">
          <CardsCaract
            iconoClase="fa-solid fa-medal"
            titulo="Experiencia y Profesionalismo"
            descripcion="Años de experiencia. con una alta calidad de servicio"
          />
          <CardsCaract
            iconoClase="fa-solid fa-user-graduate"
            titulo="Variedad"
            descripcion="Gran selección de platos como de bebidas"
          />
          <CardsCaract
            iconoClase="fa-solid fa-heart"
            titulo="Servicio Personalizado"
            descripcion="Nos adaptamos a tus gustos y necesidades"
          />
          <CardsCaract
            iconoClase="fa-solid fa-shield-halved"
            titulo="Seguridad y Comodidad"
            descripcion="Siempre pendientes de tu bienestar y goce de nuestros servicios"
          />
        </section>

        <section className="container informacion-adicional">
          <InfoBanner />
        </section>

        <InfroCronos
          titulo={"Pickeos"}
          descipcion={
            "Los pickeos de Cronos Restobar ofrecen una variedad de bocadillos perfectos para compartir entre amigos."
          }
          direccion={"/Imagenes/tequeños.jpg"}
          direccion2={"/Imagenes/alitas.jpg"}
        />
        <InfroCronos
          titulo={"Bebidas"}
          descipcion={
            "En bebidas, Cronos Restobar te invita a disfrutar de una carta variada que incluye cocteles clásicos."
          }
          direccion={
            "https://cocteles.club/wp-content/uploads/como-hacer-c%C3%B3ctel-laguna-azul-1.jpg"
          }
          direccion2={
            "https://img.freepik.com/fotos-premium/verter-cerveza-fria-vaso-sobre-fondo-negro_288539-140.jpg"
          }
        />

        <section className="container top-products">
          <h1 className="heading-1">Mejores Productos</h1>
          <div className="container-products">
            {topProducts.map((product, index) => (
              <CardsP
                key={index}
                direccion={product.productImage}
                nombre={product.name}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
