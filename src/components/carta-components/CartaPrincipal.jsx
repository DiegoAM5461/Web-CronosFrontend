import "./CartaPrincipal.css";
import { ItemCarta } from "./ItemCarta";

export const CartaPrincipal = ({tituloCarta, direccionImagen}) => {
  return (
    <>
      <section className="header">
        <div className="header-content">
          <div className="header-image">
            <img src={direccionImagen}/>
          </div>
          <h1>{tituloCarta}</h1>
        </div>
      </section>
      <div className="container-cartaPrincipal">
      <section className="menu-cartaPrincipal">
        <h2>Menu de {tituloCarta}</h2>
        <div className="items-cartaPrincipal">
         <ItemCarta/>
        </div>
      </section>
      <section className="order-cartaPrincipal">
        <h2>Mi pedido</h2>
        <div className="order-content-cartaPrincipal">
          <p>No tienes Pedidos</p>
          <button>Aceptar</button>
        </div>
      </section>
    </div>
    </>
  );
};
