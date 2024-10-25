import "./Pages-Css/Login.css";
import { Button } from "../components/ButtonC/Button";
import { NavLink } from "react-router-dom";
export const Login = () => {
  return (
    <>
      <div className="main-container">
        <div className="login-container">
          <h2>Iniciar Sesión</h2>
          <form action="login_usuario_be.php" method="POST">
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Nombre de Usuario"
                required
              />
            </div>
            <div className="form-group">
              <div className="password-container">
                <input
                  type="password"
                  id="password"
                  name="pasword"
                  placeholder="Contraseña"
                  required
                />
                <i className="fas fa-eye" id="togglePassword"></i>
              </div>
            </div>
            <div className="form-group">
            <Button title="Iniciar Sesión" className="submit-button" />
              <NavLink className="volver" to="/">
                Volver a la página principal
              </NavLink>
              <NavLink className="registro" to="/registro">
                Crear una cuenta nueva
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
