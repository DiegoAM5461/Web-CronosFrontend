import React from 'react'
import './CardsCaraact.css'
//CHECKPOINT
export const CardsCaract = ({ iconoClase, titulo, descripcion }) => {
  return (
    <>
      <div className="card-caracteristicas">
        <i className={iconoClase}></i>
        <div className="caracteristicas-content">
          <h2>{titulo}</h2>
          <p>{descripcion}</p>
        </div>
      </div>
    </>
  )
}
