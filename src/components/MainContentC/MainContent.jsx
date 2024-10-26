import { CardsCaract } from "../CardCaractC/CardsCaract";
import { CardsP } from "../CardProductC/CardsP";
import { InfroCronos } from "../InfoCronosC/InfroCronos";
import { InfoBanner } from "../InforBannerC/InfoBanner";
import "./MainContent.css";

export const MainContent = () => {
  return (
    <>
      <div className="first-main">
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
            "Los pickeos de Cronos Restobar ofrecen una variedad de bocadillos perfectos para compartir entre amigos. Desde crocantes alitas de pollo hasta deliciosas papas rústicas con salsas especiales, cada bocado está pensado para complementar la experiencia con sabores intensos y frescos. Ideales para acompañar tus bebidas favoritas mientras disfrutas de un buen momento."
          }
          direccion={"../../../public/Imagenes/tequeños.jpg"}
          direccion2={"../../../public/Imagenes/alitas.jpg"}
        />
        <InfroCronos
          titulo={"Bebidas"}
          descipcion={
            "En bebidas, Cronos Restobar te invita a disfrutar de una carta variada que incluye cocteles clásicos, cervezas artesanales y refrescantes jugos naturales. Ya sea que prefieras un trago con toques tropicales o algo más suave, encontrarás la opción perfecta para acompañar tus pickeos y hacer que cada visita sea inolvidable."
          }
          direccion={"../../../public/Imagenes/tequeños.jpg"}
          direccion2={"../../../public/Imagenes/alitas.jpg"}
        />

        <section className="container top-products">
          <h1 className="heading-1">Mejores Productos</h1>
          <div className="container-products">
            <CardsP
              direccion={"../../../public/Imagenes/alitas.jpg"}
              tagDireccion={"Alitas BBQ"}
              nombre={"Alitas BBQ"}
              precio={"S/ 5.99"}
            />
            <CardsP
              direccion={"../../../public/Imagenes/alitas.jpg"}
              tagDireccion={"Alitas BBQ"}
              nombre={"Alitas BBQ"}
              precio={"S/ 5.99"}
            />
            <CardsP
              direccion={"../../../public/Imagenes/alitas.jpg"}
              tagDireccion={"Alitas BBQ"}
              nombre={"Alitas BBQ"}
              precio={"S/ 5.99"}
            />
            <CardsP
              direccion={"../../../public/Imagenes/alitas.jpg"}
              tagDireccion={"Alitas BBQ"}
              nombre={"Alitas BBQ"}
              precio={"S/ 5.99"}
            />
          </div>
        </section>
      </div>
    </>
  );
};
