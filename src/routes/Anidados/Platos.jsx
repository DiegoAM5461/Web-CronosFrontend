import { CartaPrincipal } from "../../components/carta-components/CartaPrincipal";
import { ContItems } from "../../components/carta-components/ContItems";
import { ItemsAsked } from "../../components/carta-components/ItemsAsked";

export const Platos = () => {
  return (
    <>
      <div className="presentation-principal">
        <CartaPrincipal
          tituloCarta={"Platos"}
          direccionImagen={
            "/public/Imagenes/BOTELLAS PISCO/Queirolo_Quebranta_(Botella).webp"
          }
        />
      </div>
      <div className="cartaPrincipal-container">
        <div className="productsall-cartaPrincipal">
          <ContItems categoryId={14} />
        </div>
        <div className="pedidosMB-ordenes">
          <ItemsAsked />
        </div>
      </div>
    </>
  );
};
