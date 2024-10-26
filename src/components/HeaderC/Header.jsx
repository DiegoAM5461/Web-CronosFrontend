import "./Header.css";
import { Navbar } from "../NavbarC/Navbar";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header>
        <div className="container-hero">
          <div className="container hero">
            <div className="soporte">
              <i className="fa-solid fa-headset"></i>
              <div className="content-soporte">
                <span className="text">Soporte</span>
                <br />
                <span className="number">+51 922-941-335</span>
              </div>
            </div>

            <div className="container-logo">
              <i className="fa-solid fa-champagne-glasses"></i>
              <h1 className="logo">
                <NavLink className="nav-link" to="/">
                  Cronos Restobar
                </NavLink>
              </h1>
            </div>

            <div className="container-user">
              <NavLink className="nav-link" to="/login">
                <i className="fa-solid fa-user"></i>
              </NavLink>
              <a href="https://www.facebook.com/LluviaDeArenaOf/">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-tiktok"></i>
              <div className="content-redes">
                <span className="text"></span>
              </div>
            </div>
          </div>
        </div>

        <Navbar />
      </header>
    </>
  );
};
