import { Enlaces } from "../Enlaces/Enlaces";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InforCronos.css";

export const InfroCronos = ({ direccion, direccion2, descipcion, titulo }) => {
  return (
    <div className="infroC-container container my-5">
      <div className="row align-items-center">
        {/* Texto */}
        <div className="infroC-text col-md-6">
          <h2 className="infroC-title mb-4">{titulo}</h2>
          <p className="infroC-description mb-4">{descipcion}</p>
          <div>
            <Enlaces direccion={"carta"} titulo={"Conocer Más"} />
          </div>
        </div>
        {/* Primera Imagen */}
        <div className="infroC-image col-md-3 text-center">
          <img
            className="infroC-img img-fluid rounded shadow"
            src={direccion}
            alt="descripción-img"
          />
        </div>
        {/* Segunda Imagen */}
        <div className="infroC-image col-md-3 text-center">
          <img
            className="infroC-img img-fluid rounded shadow"
            src={direccion2}
            alt="descripción-img"
          />
        </div>
      </div>
    </div>
  );
};
