import { Banner } from "../components/BannerC/Banner"
import { Footer } from "../components/FooterC/Footer"
import { Header } from "../components/HeaderC/Header"
import { InfoBanner } from "../components/InforBannerC/InfoBanner"
import { MainContent } from "../components/MainContentC/MainContent"
import './Pages-Css/Inicio.css'

export const Inicio = () => {
  return (
    <>
        <Header/>
        <Banner/>
        <MainContent/>
        <Footer/>
    </>
  )
}
