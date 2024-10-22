import { Button } from "../ButtonC/Button";
import "./InforCronos.css";

export const InfroCronos = ({ direccion, direccion2, descipcion, titulo }) => {
  return (
    <>
      <div className="info-inicio">
        <h2 className="title-info">{titulo}</h2>
        <p className="descripción-info">{descipcion}</p>
        <div className="boton-personalizado">
          <Button
            className="boton-personalizado"
            direccion={"carta"}
            titulo={"Conocer Más"}
          />
        </div>
        <img className="imagen1" src={direccion} alt="descripción-img" />
        <img className="imagen2" src={direccion2} alt="descripción-img" />
      </div>
    </>
  );
};
