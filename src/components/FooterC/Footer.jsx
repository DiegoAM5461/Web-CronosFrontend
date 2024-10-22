import "./Footer.css";

export const Footer = () => {
  return (
    <>
      <footer>
        <div className="container margin_60_35">
          <div className="row">
            <div className="col-lg-5 col-md-12 p-r-5">
              <h2>
                <span className="color-titulo">¿Quiénes somos?</span>
              </h2>
              <br />
              <p className="text-justify">
                Somos Cronos, un restobar diseñado para ofrecer no solo
                deliciosas bebidas y comidas, sino para transportarte a un
                espacio y un ambiente único se unen para brindarte una
                experiencia inolvidable.
              </p>
              <br />
              <div className="follow_us">
                <ul>
                  <li>Síguenos en</li>
                  <li>
                    <a
                      href="https://www.facebook.com/LluviaDeArenaOf/"
                      target="_blank"
                      aria-label="Link a Facebook"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" aria-label="Link a Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" aria-label="Link a Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" aria-label="Link a Youtube">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 ml-lg-auto">
              <h2>Soporte</h2>
              <br />
              <ul className="links">
                <li>
                  <a
                    href="Contacto.html"
                    className="py-2"
                    aria-label="Centro de ayuda"
                  >
                    Centro de ayuda
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2"
                    aria-label="Términos y Condiciones"
                  >
                    Términos y condiciones
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2"
                    aria-label="Libro de reclamación"
                  >
                    Libro de reclamación
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
              <h2>Contactanos</h2>
              <br />
              <ul className="contacts">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    className="py-2"
                    aria-label="+51 956 045 734"
                  >
                    <i className="fas fa-phone-alt"></i> +51 922-941-335
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    className="py-2"
                    aria-label="Enviar correo a informes@CronosRestobar.com"
                  >
                    <i className="far fa-envelope"></i>{" "}
                    informes@CronosRestobar.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* row */}
          <div className="row">
            <div className="col-6">
              <img
                src="https://aventuras.pe/public/img/cards_all.svg"
                alt="Tarjetas de crédito aceptadas"
                width="146"
                height="30"
              />
            </div>
            <div className="col-6 pl-0 text-right">
              <span>Copyright © 2024 Cronos Restobar</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
