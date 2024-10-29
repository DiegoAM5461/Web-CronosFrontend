import "./Pages-Css/Login.css";
import { Button } from "../components/ButtonC/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const usuarios = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
];

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Validar las credenciales
    const usuarioValido = usuarios.find(
      (user) => user.username === username && user.password === password
    );

    if (usuarioValido) {
      navigate("/administracion");
    } else {
      setError("Nombre de usuario o contraseña incorrectos");
    }
  };

  return (
    <>
        <div className="main-container">
          <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Nombre de Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <div className="password-container">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i className="fas fa-eye" id="togglePassword"></i>
                </div>
              </div>
              {error && <p className="error-message">{error}</p>}
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
