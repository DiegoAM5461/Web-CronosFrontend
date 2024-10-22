import { Footer } from "../components/FooterC/Footer"
import { Header } from "../components/HeaderC/Header"
import { NavLink, Outlet } from "react-router-dom"

export const Carta = () => {
  return (
    <>
      <Header/>
      <ul>
        <li><NavLink to="pickeos">Pickeos</NavLink></li>
        <li><NavLink to="bebidas">Bebidas</NavLink></li>
        <li><NavLink to="platos">Platos</NavLink></li>
      </ul>
      <Footer/>
      <Outlet/>
    </>
  )
}
