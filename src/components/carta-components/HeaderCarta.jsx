import React from "react";
import "./CartaComponent.css";

export const HeaderCarta = ({ title, imageUrl }) => {
  return (
    <div className="carta-header">
      <h1 className="carta-title">{title}</h1>
      <img className="carta-image" src={imageUrl} alt={title} />
    </div>
  );
};
