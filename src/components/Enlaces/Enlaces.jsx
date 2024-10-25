import { NavLink } from 'react-router-dom'

export const Enlaces = ({ direccion, titulo, color, hoverColor }) => {
  const buttonStyle = {
    display: 'inline-block',
    color: 'white',
    backgroundColor: color || '#000080', // El color por defecto es azul
    padding: '10px 30px',
    borderRadius: '18px',
    textDecoration: 'none',
    fontSize: '1.5em',
    transition: 'background-color 0.1s ease',
  }

  const hoverStyle = {
    backgroundColor: hoverColor || '#0000cc', // Color al pasar el mouse
  }

  return (
    <div className="boton-azul">
      <NavLink
        to={direccion}
        style={buttonStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = hoverColor || '#0000cc'}
        onMouseLeave={(e) => e.target.style.backgroundColor = color || '#000080'}
      >
        {titulo}
      </NavLink>
    </div>
  )
}
