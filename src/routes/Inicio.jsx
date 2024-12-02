import { Banner } from "../components/BannerC/Banner"
import { Footer } from "../components/FooterC/Footer"
import { Header } from "../components/HeaderC/Header"
import { MainContent } from "../components/MainContentC/MainContent"
import './Pages-Css/Inicio.css'
//CHECKPOINT
export const Inicio = () => {
  return (
    <>
      <div className="inicio-general">
        <Header/>
        <Banner/>
        <MainContent/>
        <Footer/>
      </div>
        
    </>
  )
}
