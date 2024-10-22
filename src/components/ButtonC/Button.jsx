import './Button.css'
import { NavLink } from 'react-router-dom'
export const Button = ({ direccion, titulo }) => {
  return (
    <>
      <div className="boton-azul">
      <NavLink className="nav-link" to={direccion}>{titulo}</NavLink>
      </div>    
    </>
  )
}
