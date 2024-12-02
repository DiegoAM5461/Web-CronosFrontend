import './Contenido.css'

export const Contenido = () => {
    return (
      <>
        <main className="main-contentNosotros">
          <section className="about" id="nosotros">
            <div className="container">
              <div className="about-text">
                <h2>¿Quiénes somos?</h2>
                <p>
                  Somos Cronos, un restobar diseñado para ofrecer no solo deliciosas
                  bebidas y comidas, sino para transportarte a un espacio único, donde el
                  ambiente se une para brindarte una experiencia inolvidable.
                </p>
                <br />
                <h2>Misión</h2>
                <p>
                  Nuestra misión es ofrecer a nuestros clientes una experiencia moderna y
                  eficiente en Cronos Restobar, combinando la calidad de nuestra oferta de
                  tragos y cervezas con un sistema innovador de gestión de pedidos y
                  reservas, que permita un servicio rápido y sin complicaciones.
                </p>
                <br />
                <h2>Visión</h2>
                <p>
                  Nuestra visión es convertirnos en el restobar de referencia en la región,
                  reconocido por nuestra variada selección de bebidas, deliciosos piqueos y
                  platos a la carta, y ambientes modernos y atractivos, mientras integramos
                  tecnología avanzada para optimizar la experiencia del cliente y mejorar la
                  eficiencia operativa.
                </p>
              </div>
              <div className="about-image">
                <img src="../../../public/Imagenes/logo.jpg" alt="logo nosotros" />
              </div>
            </div>
          </section>
        </main>
      </>
    );
  };
  
