import { Links } from "../components/LinkC/Links";
import { Footer } from "../components/FooterC/Footer";
import { Header } from "../components/HeaderC/Header";
import './Pages-Css/Contacto.css'
export const Contacto = () => {
  return (
    <>
    <Header/>
      <main className="main-content">
        <div className="contact-header">
          <h1>Contacto</h1>
          <hr className="divider" />
        </div>
        <br /><br />
        <div className="contact-info">
          <img src="../../public/Imagenes/logo.jpg" alt="Descripción de la imagen" className="contact-image" />
          <ul className="contact-list">
            <li>
              <strong>
                <i className="fa-solid fa-phone"></i> Contacto Rápido:
              </strong>
              <br />
              +51 922-941-335
            </li>
            <br />
            <li>
              <strong>
                <i className="fa-solid fa-clock"></i> Horario de Atención:
              </strong>
              <br />
              Lunes a Sábado: 7:00 a.m - 10:30 p.m
              <br />
              Domingo: 7 a.m - 2 p.m
            </li>
            <br />
            <li>
              <strong>
                <i className="fa-solid fa-location-dot"></i> Ubicación:
              </strong>
              <br />
              📍 Av. Ayabaca Mz B Lt 4 - Ica, Perú
            </li>
            <br />
          </ul>
        </div>
        <br />
        <div className="reservation">
          <h2>¡Haz tu reservación ahora!</h2>
          <br />
          <Links direccion={"reserva"} titulo={"Reserva"}/>
        </div>
      </main>
      <Footer/>
    </>
  );
};
