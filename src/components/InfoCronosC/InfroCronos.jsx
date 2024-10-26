import { Enlaces } from "../Enlaces/Enlaces";
import "./InforCronos.css";

export const InfroCronos = ({ direccion, direccion2, descipcion, titulo }) => {
  return (
    <>
      <div className="info-inicio">
        <div className="info-text">
          <h2 className="title-info">{titulo}</h2>
          <p className="descripción-info">{descipcion}</p>
          <div className="boton-personalizado">
            <Enlaces
              direccion={"carta"}
              titulo={"Conocer Más"}
            />
          </div>
        </div>
        <div className="image-infor1">
          <img className="imagen1" src={direccion} alt="descripción-img" />
        </div>
        <div className="image-infor2">
          <img className="imagen2" src={direccion2} alt="descripción-img" />
        </div>
      </div>
    </>
  );
};
