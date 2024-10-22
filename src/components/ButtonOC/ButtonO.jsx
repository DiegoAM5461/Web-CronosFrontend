import './ButtonO.css'
import { Link} from 'react-router-dom'
export const ButtonO = ({ direccion, titulo }) => {
  return (
    <>
      <div className="boton-naranja">
      <Link className="nav-link" to={direccion}>{titulo}</Link>
      </div>    
    </>
  )
}
