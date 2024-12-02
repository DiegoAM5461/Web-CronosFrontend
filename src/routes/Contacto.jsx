import { Enlaces } from "../components/Enlaces/Enlaces";
import { Footer } from "../components/FooterC/Footer";
import { Header } from "../components/HeaderC/Header";
import "./Pages-Css/Contacto.css"

export const Contacto = () => {
  return (
    <>
      <Header />
      <main className="main-contentContacto">
        <div className="contact-header">
          <h1>Contacto</h1>
          <hr className="divider-contact" />
        </div>
        <br />
        <div className="contact-info">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15480.419892624688!2d-75.7361145!3d-14.0709781!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110e31a01a099f9%3A0x2c67fa59f5e182a5!2sCronos%20Restobar!5e0!3m2!1ses-419!2spe!4v1730178760884!5m2!1ses-419!2spe"
            width="600"
            height="450"
            style={{ marginLeft: "120px"}}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
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
          <Enlaces direccion={"/reservaciones"} titulo={"RESERVA"} />
        </div>
      </main>
      <Footer />
    </>
  );
};
