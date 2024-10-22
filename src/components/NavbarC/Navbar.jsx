import { NavLink } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
  return (
    <>
        <div className="container-navegacion">
        <nav className="navegacion container">
          <i className="fa-solid fa-bars"></i>
          <ul className="menu">
            <li>
              <NavLink className="nav-link" to='/'>Inicio</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to='/nosotros'>Nosotros</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to='/carta'>Carta</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to='/contacto'>Contacto</NavLink>
            </li>
            {/* Ir aumentando los links que sean necesarios a futuro */}
          </ul>
        </nav>
      </div>
    </>
  )
}
